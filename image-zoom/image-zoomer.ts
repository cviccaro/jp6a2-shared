import { Injectable, ViewContainerRef, ComponentRef, EventEmitter, ComponentFactoryResolver, Output, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { Logger } from '../logger/logger.service';
import { ImageZoomerComponent } from './image-zoomer.component';
import { ImageZoomLensContainerComponent } from './zoom-lens-container.component';
import { ImageZoomDirective } from './image-zoom.directive';
import { ZoomLensPanPercentagesEvent, ZoomLensPanPixelsEvent } from './zoom-lens.interfaces';

@Injectable()
export class JpImageZoomer implements OnDestroy {
	public defaultViewContainer: ViewContainerRef;
	private zoomLensContainerRef: ComponentRef<ImageZoomLensContainerComponent>;
	private zoomerRef: ComponentRef<ImageZoomerComponent>;
	private activeItem: ImageZoomDirective;

	constructor(private cr: ComponentFactoryResolver, private logger: Logger) { }

	open(directive: ImageZoomDirective) {
		this.activeItem = directive;

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

				this.zoomLensContainerRef.instance.pan.subscribe((event: ZoomLensPanPercentagesEvent) => {
					this.zoomerRef.instance.pan(event);
				});
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

			this.logger.log('Rect of image-zoom directive prior to opening the Zoomer: ', rect);
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
		this.zoomerRef.instance.close();
	}

	pan(event: ZoomLensPanPercentagesEvent) {
		this.zoomerRef.instance.pan(event);
	}

	ngOnDestroy() {
		if (typeof (<ComponentRef<any>>this.zoomerRef).instance.canDestroy === 'function') {
		  (<ComponentRef<any>>this.zoomerRef).instance.canDestroy().then ( () => this.zoomerRef.destroy() );
		} else {
		  this.zoomerRef.destroy();
		}
	}
}
