import { Component, AfterViewInit, ElementRef, HostBinding, HostListener } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { Logger } from '../logger/logger.service';
import { ImageZoomLensComponent } from './zoom-lens.component';
import { ZoomLensPanPercentagesEvent } from './zoom-lens.interfaces';

@Component({
	moduleId: module.id,
	selector: 'jp-image-zoomer',
	templateUrl: './image-zoomer.component.html',
	styleUrls: [ './image-zoomer.component.css' ]
})
export class ImageZoomerComponent implements AfterViewInit {
	private _imageUrl: string;
	private originalImageWidth: number;
	private originalImageHeight: number;

	public set imageUrl(url: string) {
		this._imageUrl = url;
		this.safeBackgroundImage = this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
		this.logger.log('Set background image to ' + url + ' .... loading!');

		let loadImg = new Image();
		loadImg.addEventListener('load', (e: Event) => {
			this.originalImageWidth = loadImg.width;
			this.originalImageHeight = loadImg.height;

			this.logger.log('Image loaded with size', loadImg.width, loadImg.height);
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

	@HostBinding('class.transitioning')
	transitioning = false;

	@HostBinding('style.background-image')
	safeBackgroundImage: SafeStyle;

	@HostBinding('style.background-position')
	safeBackgroundPosition: SafeStyle;

	@HostBinding('class.open')
	visible = false;

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
		this.transitioning = true;
		setTimeout(() => {
			this.visible = true;
		});
	}

	close() {
		this.visible = false;
	}

	pan(e: ZoomLensPanPercentagesEvent) {
		let left = -1 * this.originalImageWidth * e.left;
		let top = -1 * this.originalImageHeight * e.top;

		this.logger.log('Pan background to: ', `${left}px ${top}px`, 'from percentages ', e.left, e.top);
		this.safeBackgroundPosition = this.sanitizer.bypassSecurityTrustStyle(`${left}px ${top}px`);
	}
}