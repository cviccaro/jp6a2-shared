import { Component, AfterViewInit, ElementRef, HostBinding, HostListener } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { Logger } from '../../services/logger.service';
import { ImageZoomDirective } from './image-zoom.directive';
import { ImageZoomLensContainerComponent } from './zoom-lens/container/zoom-lens-container.component';
import { ZoomLensPanPixelsEvent, ZoomLensPanPercentagesEvent } from './zoom-lens/zoom-lens.interfaces';

@Component({
	moduleId: module.id,
	selector: 'jp-image-zoomer',
	template: '',
	styleUrls: [ './image-zoomer.component.css' ]
})
export class ImageZoomerComponent implements AfterViewInit {
	/**
	 * Public class properties
	 */
	public margin = 0;
	public canvasWidth: number;
	public canvasHeight: number;
	public canvasLeft: number;
	public canvasTop: number;
	public lensShape: string;
	public zoomAmount: number;

	/**
	 * Image URL
	 */
	public get imageUrl() {
		return this._imageUrl;
	}
	public set imageUrl(url: string) {
		this._imageUrl = url;
		this.safeBackgroundImage = this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);

		const loadImg = new Image();
		loadImg.addEventListener('load', (e: Event) => {
			this.originalImageWidth = loadImg.width;
			this.originalImageHeight = loadImg.height;

			this.elementWidth = parseInt(this.element.nativeElement.offsetWidth);
			this.elementHeight = parseInt(this.element.nativeElement.offsetHeight);

			this.position();
		});

		loadImg.src = url;
	}



	/**
	 * Private class properties
	 */
	private _imageUrl: string;
	private originalImageWidth: number;
	private originalImageHeight: number;
	private elementWidth: number;
	private elementHeight: number;

	constructor(private logger: Logger, public element: ElementRef, private sanitizer: DomSanitizer) {}

	/**
	 * Style Bindings
	 */
	@HostBinding('style.top')
	positionTop: string;

	@HostBinding('style.left')
	positionLeft: string;

	@HostBinding('style.right')
	positionRight: string;

	@HostBinding('style.background-position')
	safeBackgroundPosition: SafeStyle;

	@HostBinding('style.background-image')
	safeBackgroundImage: SafeStyle;

	/**
	 * CSS Class Bindings
	 */
	@HostBinding('class.transitioning')
	transitioning = false;

	@HostBinding('class.open')
	visible = false;

	@HostBinding('class.circular')
	get willApplyCssCircularClass() {
		return this.lensShape === 'circle';
	}

	/**
	 * Event Listeners
	 */
	@HostListener('transitionend', ['$event'])
	onTransitionEnd(e: any) {
		if (!this.visible) {
			this.transitioning = false;
		}
	}

	/**
	 * Lifecycle after View initializes
	 */
	ngAfterViewInit() {
		this.logger.log('ImageZoomerComponent View Initialized.', this);
	}

	/**
	 * Open the zoomer
	 */
	open() {
		this.logger.log('ImageZoomerComponent.open() called', this);
		this.transitioning = true;
		setTimeout(() => {
			this.visible = true;
		});
	}

	/**
	 * Close the zoomer
	 */
	close() {
		this.visible = false;
	}

	/**
	 * Pan the background inside the zoomer
	 */
	pan(e: ZoomLensPanPixelsEvent) {
		const leftScaled = (e.left / e.containerWidth) * this.originalImageWidth;
		const topScaled = (e.top / e.containerHeight) * this.originalImageHeight;

		const leftPos = -1 * Math.max(0, Math.min(leftScaled - (this.elementWidth / 2), this.originalImageWidth - this.elementWidth));
		const topPos = -1 * Math.max(0, Math.min(topScaled - (this.elementHeight / 2), this.originalImageHeight - this.elementHeight));

		this.safeBackgroundPosition = this.sanitizer.bypassSecurityTrustStyle(`${leftPos * this.zoomAmount}px ${topPos * this.zoomAmount}px`);
	}

	/**
	 * Position the zoomer
	 *
	 * @param {number} left
	 * @param {number} top
	 */
	position(left?: number, top?: number) {
		if (left === undefined) {
			left = this.canvasLeft + this.canvasWidth + this.margin;
		}
		if (top === undefined) {
			top = this.canvasTop - (this.canvasHeight / 2);
		}

		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;
		const elementHeight = this.element.nativeElement.offsetHeight;
		const elementWidth = this.element.nativeElement.offsetWidth;
		const scrollTop = document.body.scrollTop;
		const scrollBottom = scrollTop + windowHeight;

		if (top <= scrollTop) {
			top = top + (scrollTop - top);
		} else if ((top + elementHeight) >= scrollBottom) {
			top = top - ((top + elementHeight) - scrollBottom) - this.margin - this.margin;
		}

		this.positionTop = `${top}px`;

		if (left + elementWidth > windowWidth) {
			this.positionLeft = 'auto';
			this.positionRight = `${windowWidth - this.canvasLeft + this.margin}px`;
		} else {
			this.positionLeft = `${left}px`;
			this.positionRight = 'auto';
		}
	}

	/**
	 * Configure the instance
	 */
	config(props: { [key: string]: any }) {
		for (const prop in props) {
			(<any>this)[prop] = props[prop];
		}
	}
}
