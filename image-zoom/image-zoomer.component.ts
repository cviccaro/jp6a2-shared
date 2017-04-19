import { Component, AfterViewInit, ElementRef, HostBinding, HostListener } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { Logger } from '../logger/logger.service';
import { ImageZoomLensComponent, ZoomLensPanPercentagesEvent, ZoomLensPanPixelsEvent} from './index';

@Component({
	moduleId: module.id,
	selector: 'jp-image-zoomer',
	template: '',
	styleUrls: [ './image-zoomer.component.css' ]
})
export class ImageZoomerComponent implements AfterViewInit {
	private _imageUrl: string;
	private originalImageWidth: number;
	private originalImageHeight: number;
	private elementWidth: number;
	private elementHeight: number;

	public margin = 20;
	public canvasWidth: number;
	public canvasHeight: number;
	public canvasLeft: number;
	public canvasTop: number;
	public lensShape: string;

	public set imageUrl(url: string) {
		this._imageUrl = url;
		this.safeBackgroundImage = this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);

		let loadImg = new Image();
		loadImg.addEventListener('load', (e: Event) => {
			this.originalImageWidth = loadImg.width;
			this.originalImageHeight = loadImg.height;

			this.elementWidth = parseInt(this.element.nativeElement.offsetWidth);
			this.elementHeight = parseInt(this.element.nativeElement.offsetHeight);

			this.position();

			this.logger.log('Set element width to ' + this.elementWidth + '.  Set element height to ' + this.elementHeight);
		});

		loadImg.src = url;
	}

	public get imageUrl() {
		return this._imageUrl;
	}

	constructor(private logger: Logger, public element: ElementRef, private sanitizer: DomSanitizer) {}

	@HostBinding('style.top')
	positionTop: string;

	@HostBinding('style.left')
	positionLeft: string;

	@HostBinding('style.right')
	positionRight: string;

	@HostBinding('class.transitioning')
	transitioning = false;

	@HostBinding('style.background-image')
	safeBackgroundImage: SafeStyle;

	@HostBinding('style.background-position')
	safeBackgroundPosition: SafeStyle;

	@HostBinding('class.open')
	visible = false;

	@HostBinding('class.circular')
	get willApplyCssCircularClass() {
		return this.lensShape === 'circle';
	}

	@HostListener('transitionend', ['$event']) 
	onTransitionEnd(e: any) {
		if (!this.visible) {
			this.transitioning = false;
		}
	}

	ngAfterViewInit() {
		this.logger.log('ImageZoomerComponent View Initialized.', this);
	}

	open() {
		this.logger.log('ImageZoomerComponent.open() called', this);
		this.transitioning = true;
		setTimeout(() => {
			this.visible = true;
		});
	}

	close() {
		this.visible = false;
	}

	pan(e: ZoomLensPanPixelsEvent) {
		const leftScaled = (e.left / e.containerWidth) * this.originalImageWidth;
		const topScaled = (e.top / e.containerHeight) * this.originalImageHeight;

		const leftPos = Math.max(0, Math.min(leftScaled - (this.elementWidth / 2), this.originalImageWidth - this.elementWidth));
		const topPos = Math.max(0, Math.min(topScaled - (this.elementHeight / 2), this.originalImageHeight - this.elementHeight));

		//this.logger.log(`Pan original image to ${leftPos} x ${topPos}`);

		this.safeBackgroundPosition = this.sanitizer.bypassSecurityTrustStyle(`-${leftPos}px -${topPos}px`);
	}

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
	config(props: { [key: string] : any }) {
		for (let prop in props) {
			(<any>this)[prop] = props[prop];
		}
	}
}