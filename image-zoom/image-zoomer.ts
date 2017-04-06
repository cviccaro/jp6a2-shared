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
			const directiveEl: HTMLElement = this.activeItem.el.nativeElement;
			const imageUrl = directiveEl.getAttribute('src');
			let rect = directiveEl.getBoundingClientRect();

			if (!this.zoomLensContainerRef) {
				let componentFactory = this.cr.resolveComponentFactory(ImageZoomLensContainerComponent);
				let cmpRef = this.defaultViewContainer.createComponent(componentFactory);

				// Store reference to component
				this.zoomLensContainerRef = cmpRef;

				// Configure instance
				this.zoomLensContainerRef.instance.config({
					imageUrl: imageUrl,
					positionTop: `${directiveEl.offsetTop}px`,
					positionLeft: `${rect.left}px`,
					containerWidth: `${rect.width}px`,
					containerHeight: `${rect.height}px`,
					mode: 'inline',
					lensWidth: directive.jpImageZoomLensWidth,
					lensHeight: directive.jpImageZoomLensHeight,
					lensShape: directive.jpImageZoomLensShape
				});

				// Append it to DOM
				directive.el.nativeElement.parentElement.appendChild(cmpRef.location.nativeElement);

				this.mouseDidPan = this.zoomLensContainerRef.instance.pan.subscribe((e: ZoomLensPanPixelsEvent) => this.pan(e));
				this.mouseDidLeave = this.zoomLensContainerRef.instance.mouseDidLeave.subscribe((e: any) => this.close());
			}

			// Resolve the component
			observer.next(this.zoomLensContainerRef);
			observer.complete();
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

				// Configure instance
				this.zoomLensContainerRef.instance.config({
					imageUrl: imageUrl,
					positionTop: `${directiveEl.offsetTop}px`,
					positionLeft: `${rect.left}px`,
					containerWidth: `${rect.width}px`,
					containerHeight: `${rect.height}px`,
					mode: 'outside',
					lensWidth: directive.jpImageZoomLensWidth,
					lensHeight: directive.jpImageZoomLensHeight,
					lensShape: directive.jpImageZoomLensShape
				});

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
				this.zoomerRef.instance.canvasWidth = rect.width;
				this.zoomerRef.instance.canvasHeight = rect.height;
				this.zoomerRef.instance.canvasLeft = rect.left;
				this.zoomerRef.instance.canvasTop = directiveEl.offsetTop;
				this.zoomerRef.instance.lensShape = directive.jpImageZoomLensShape;

				// Append it to DOM
				this.defaultViewContainer.element.nativeElement.appendChild(cmpRef.location.nativeElement);
			}

			this.zoomerRef.instance.imageUrl = imageUrl;

			rect = directiveEl.getBoundingClientRect();

			this.zoomerRef.instance.position(rect.left + rect.width + 20, directiveEl.offsetTop);

			this.zoomerRef.instance.open();

			// Resolve the component
			observer.next(this.zoomerRef);
			observer.complete();
		});
	}

	close(directive?: ImageZoomDirective) {
		if (directive === this.activeItem) this.activeItem = null;
		this.destroyCmp(this.zoomLensContainerRef);
		this.destroyCmp(this.zoomerRef);

		this.zoomerRef = this.zoomLensContainerRef = undefined;
	}

	pan(event: ZoomLensPanPixelsEvent) {
		if (this.zoomerRef) this.zoomerRef.instance.pan(event);
	}

	ngOnDestroy() {
		this.destroyCmp(this.zoomLensContainerRef);
		this.destroyCmp(this.zoomerRef);

		if (this.mouseDidLeave) {
			this.mouseDidLeave.unsubscribe();
		}

		if (this.mouseDidPan) {
			this.mouseDidPan.unsubscribe();
		}
	}

	private destroyCmp(cmpRef: ComponentRef<any>) {
		if (cmpRef) {
			if (typeof (<ComponentRef<any>>cmpRef).instance.canDestroy === 'function') {
			  cmpRef.instance.canDestroy().then ( () => cmpRef.destroy() );
			} else {
			  cmpRef.destroy();
			}

			cmpRef = undefined;
		}
	}
}
