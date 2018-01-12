import { Injectable, ViewContainerRef, ComponentRef, EventEmitter, ComponentFactoryResolver, Output, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

import { Logger } from '../../services/logger.service';
import { ImageZoomerComponent } from './image-zoomer.component';
import { ImageZoomDirective } from './image-zoom.directive';
import { ImageZoomLensContainerComponent } from './zoom-lens/container/zoom-lens-container.component';
import { ZoomLensPanPixelsEvent } from './zoom-lens/zoom-lens.interfaces';

@Injectable()
export class JpImageZoomer implements OnDestroy {
	/**
	 * Class properties
	 */
	public defaultViewContainer: ViewContainerRef;
	private zoomLensContainerRef: ComponentRef<ImageZoomLensContainerComponent>;
	private zoomerRef: ComponentRef<ImageZoomerComponent>;
	private activeItem: ImageZoomDirective;

	private mouseDidPan: Subscription;
	private mouseDidLeave: Subscription;

	/**
	 * Constructor
	 *
	 * @param {ComponentFactoryResolver} private cr
	 * @param {Logger}                   private logger
	 */
	constructor(private cr: ComponentFactoryResolver, private logger: Logger) { }

	/**
	 * Open the zoomer components and return an Observable
	 *
	 * @param  {ImageZoomDirective} directive
	 * @return {Observable}
	 */
	open(directive: ImageZoomDirective): Observable<ComponentRef<ImageZoomerComponent>> {
		this.activeItem = directive;

		this.logger.log('ImageZoomer open() called with mode ', directive.mode);

		return Observable.create((observer: Observer<any>) => {
			const directiveEl: HTMLElement = directive.el.nativeElement;
			const imageUrl = this.getImageUrl(directive);
			let rect = directiveEl.getBoundingClientRect();

			if (!this.zoomLensContainerRef) {
				const componentFactory = this.cr.resolveComponentFactory(ImageZoomLensContainerComponent);
				const cmpRef = this.defaultViewContainer.createComponent(componentFactory);

				// Store reference to component
				this.zoomLensContainerRef = cmpRef;

				// Configure instance
				this.zoomLensContainerRef.instance.config({
					imageUrl: imageUrl,
					directive: directive,
					positionTop: `${directiveEl.offsetTop}px`,
					positionLeft: `${rect.left}px`,
					containerWidth: `${rect.width}px`,
					containerHeight: `${rect.height}px`,
					mode: directive.mode,
					lensWidth: directive.lensWidth,
					lensHeight: directive.lensHeight,
					lensShape: directive.lensShape,
					bgMode: directive.bgMode,
					imageNaturalWidth: directive.imageNaturalWidth,
					imageNaturalHeight: directive.imageNaturalHeight,
					zoomAmount: +directive.zoomAmount
				});

				// Append it to DOM
				directive.el.nativeElement.parentElement.appendChild(cmpRef.location.nativeElement);

				// Subscribe to zoom-lens-container pan event
				this.mouseDidPan = this.zoomLensContainerRef.instance.pan.subscribe((e: ZoomLensPanPixelsEvent) => this.pan(e));

				// Subscribe to zoom-lens-container close event
				this.mouseDidLeave = this.zoomLensContainerRef.instance.mouseDidLeave.subscribe((e: any) => this.close());
			}

			// Create the image-zoomer component if needed
			if (directive.mode === 'outside') {
				this.logger.log('Directive is set for outside viewer.');
				if (!this.zoomerRef) {
					this.logger.log('ZoomerRef didnt exist, so creating');
					const componentFactory = this.cr.resolveComponentFactory(ImageZoomerComponent);
					const cmpRef = this.defaultViewContainer.createComponent(componentFactory);

					// Store reference to component
					this.zoomerRef = cmpRef;

					// Configure component
					this.zoomerRef.instance.config({
						canvasWidth: rect.width,
						canvasHeight: rect.height,
						canvasLeft: rect.left,
						canvasTop: directiveEl.offsetTop,
						lensShape: directive.lensShape,
						zoomAmount: directive.zoomAmount
					});

					// Append it to DOM
					this.defaultViewContainer.element.nativeElement.appendChild(cmpRef.location.nativeElement);
				}

				// Position the image-zoomer component
				rect = directiveEl.getBoundingClientRect();

				this.zoomerRef.instance.imageUrl = imageUrl;
				this.zoomerRef.instance.position(rect.left + rect.width + this.zoomerRef.instance.margin, directiveEl.offsetTop);
				this.zoomerRef.instance.open();
			}

			// Resolve the component
			observer.next(this.zoomLensContainerRef);
		});
	}

	/**
	 * Close all the zoomer components
	 *
	 * @param {ImageZoomDirective} directive
	 */
	close(directive?: ImageZoomDirective) {
		if (directive === this.activeItem) this.activeItem = null;

		this.destroyCmp(this.zoomLensContainerRef);
		this.destroyCmp(this.zoomerRef);

		this.zoomerRef = this.zoomLensContainerRef = undefined;
	}

	/**
	 * Pan the image-zoomer when the lens pans
	 *
	 * @param {ZoomLensPanPixelsEvent} event
	 */
	pan(event: ZoomLensPanPixelsEvent) {
		if (this.zoomerRef) this.zoomerRef.instance.pan(event);
	}

	/**
	 * Garbage collection
	 */
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
	/**
	 * Extract Image URL from directive, either because
	 * it's an image or has a background-image
	 *
	 * @param  {ImageZoomDirective} directive
	 * @return {string}
	 */
	private getImageUrl(directive: ImageZoomDirective): string {
		if (directive.el.nativeElement.tagName === 'IMG') {
			return directive.el.nativeElement.getAttribute('src');
		} else {
			return directive.el.nativeElement.style.backgroundImage.replace(/url\(("|')/, '').replace(/("|')\)$/, '');
		}
	}

	/**
	 * [destroyCmp description]
	 * @param {ComponentRef<any>} cmpRef [description]
	 */
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
