import { Injectable, ViewContainerRef, ComponentRef, EventEmitter, ComponentFactoryResolver, Output, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

import { Logger } from '../logger/logger.service';
import { ImageZoomerComponent } from './image-zoomer.component';
import { ImageZoomDirective } from './image-zoom.directive';
import { ImageZoomLensContainerComponent, ZoomLensPanPixelsEvent } from './zoom-lens/index';

@Injectable()
export class JpImageZoomer implements OnDestroy {
	public defaultViewContainer: ViewContainerRef;
	private zoomLensContainerRef: ComponentRef<ImageZoomLensContainerComponent>;
	private zoomerRef: ComponentRef<ImageZoomerComponent>;
	private activeItem: ImageZoomDirective;

	private mouseDidPan: Subscription;
	private mouseDidLeave: Subscription;

	constructor(private cr: ComponentFactoryResolver, private logger: Logger) { }

	open(directive: ImageZoomDirective) {
		this.activeItem = directive;

		if (directive.jpImageZoomMode === 'inline') {
			return this.openInline(directive);
		} else {
			return this.openWithViewer(directive);
		}
	}

	openInline(directive: ImageZoomDirective): Observable<ComponentRef<ImageZoomerComponent>> {
		this.logger.log('ImageZoomer.openInline() called: ', directive);

		return Observable.create((observer: Observer<any>) => {
		});
	}

	openWithViewer(directive: ImageZoomDirective): Observable<ComponentRef<ImageZoomerComponent>> {
		this.logger.log('ImageZoomer.openWithViewer() called: ', directive);
		return Observable.create((observer: Observer<any>) => {
			const directiveEl: HTMLElement = this.activeItem.el.nativeElement;
			const imageUrl = directiveEl.getAttribute('src');
			let rect = directiveEl.getBoundingClientRect();

			if (!this.zoomLensContainerRef) {
				let componentFactory = this.cr.resolveComponentFactory(ImageZoomLensContainerComponent);
				let cmpRef = this.defaultViewContainer.createComponent(componentFactory);

				// Store reference to component
				this.zoomLensContainerRef = cmpRef;

				this.zoomLensContainerRef.instance.imageUrl = imageUrl;
				this.zoomLensContainerRef.instance.positionTop = `${directiveEl.offsetTop}px`;
				this.zoomLensContainerRef.instance.positionLeft = `${rect.left}px`;
				this.zoomLensContainerRef.instance.containerWidth = `${rect.width}px`;
				this.zoomLensContainerRef.instance.containerHeight = `${rect.height}px`;

				// Append it to DOM
				directive.el.nativeElement.parentElement.appendChild(cmpRef.location.nativeElement);

				this.mouseDidPan = this.zoomLensContainerRef.instance.pan.subscribe((e: ZoomLensPanPixelsEvent) => this.pan(e));
				this.mouseDidLeave = this.zoomLensContainerRef.instance.mouseDidLeave.subscribe((e: any) => this.close());
			}

			if (!this.zoomerRef) {
				let componentFactory = this.cr.resolveComponentFactory(ImageZoomerComponent);
				let cmpRef = this.defaultViewContainer.createComponent(componentFactory);

				// Store reference to component
				this.zoomerRef = cmpRef;

				// Append it to DOM
				this.defaultViewContainer.element.nativeElement.appendChild(cmpRef.location.nativeElement);
			}

			this.zoomerRef.instance.imageUrl = imageUrl;

			rect = directiveEl.getBoundingClientRect();

			this.zoomerRef.instance.positionLeft = `${rect.left + rect.width + 20}px`;
			this.zoomerRef.instance.positionTop = `${directiveEl.offsetTop}px`;

			this.zoomerRef.instance.open();

			// Resolve the component
			observer.next(this.zoomerRef);
			observer.complete();
		});
	}

	close(directive?: ImageZoomDirective) {
		if (directive === this.activeItem) this.activeItem = null;
		this.zoomerRef.destroy();
		this.zoomLensContainerRef.destroy();

		this.zoomerRef = this.zoomLensContainerRef = undefined;
	}

	pan(event: ZoomLensPanPixelsEvent) {
		this.zoomerRef.instance.pan(event);
	}

	ngOnDestroy() {
		if (typeof (<ComponentRef<any>>this.zoomerRef).instance.canDestroy === 'function') {
		  (<ComponentRef<any>>this.zoomerRef).instance.canDestroy().then ( () => this.zoomerRef.destroy() );
		} else {
		  this.zoomerRef.destroy();
		}

		if (this.mouseDidLeave) {
			this.mouseDidLeave.unsubscribe();
		}

		if (this.mouseDidPan) {
			this.mouseDidPan.unsubscribe();
		}
	}
}
