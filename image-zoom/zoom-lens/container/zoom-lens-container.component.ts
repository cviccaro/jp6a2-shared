import { Component, ElementRef, HostBinding, HostListener, ViewChild, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ImageZoomLensComponent } from '../lens/zoom-lens.component';
import { ImageZoomLensCanvasComponent } from '../canvas/zoom-lens-canvas.component';
import { ZoomLensPanPixelsEvent, ZoomLensPanPixelsRawEvent } from '../zoom-lens.interfaces';
import { Logger } from '../../../logger/logger.service';

@Component({
	moduleId: module.id,
	selector: 'jp-image-zoom-lens-container',
	template: '<jp-image-zoom-lens-canvas (pan)="lensFocusChanged($event)"></jp-image-zoom-lens-canvas><jp-image-zoom-lens></jp-image-zoom-lens>',
	styleUrls: [ './zoom-lens-container.component.css' ]
})
export class ImageZoomLensContainerComponent {
	private _imageUrl: string;

	@ViewChild(ImageZoomLensComponent) lensCmp: ImageZoomLensComponent;
	@ViewChild(ImageZoomLensCanvasComponent) canvasCmp: ImageZoomLensCanvasComponent;

	@HostBinding('style.background-image')
	safeBackgroundImage: SafeStyle;

	@HostBinding('style.top')
	positionTop: string;

	@HostBinding('style.left')
	positionLeft: string;

	@HostBinding('style.width')
	containerWidth: string;

	@HostBinding('style.height')
	containerHeight: string;

	public set imageUrl(url: string) {
		this._imageUrl = url;
		this.safeBackgroundImage = this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
	}

	public get imageUrl() {
		return this._imageUrl;
	}

	@HostBinding('style.background-size')
	private get backgroundSIze(): SafeStyle|void {
		if (this.containerHeight && this.containerWidth) {
			return this.sanitizer.bypassSecurityTrustStyle(`${this.containerWidth} ${this.containerHeight}`);
		}
	}

	@Output() pan = new EventEmitter<ZoomLensPanPixelsEvent>();

	@Output() mouseDidLeave = new EventEmitter<any>();

	@HostListener('mouseleave', ['$event'])
	onMouseLeave(e: any) {
		this.mouseDidLeave.emit(e);
	}

	constructor(public element: ElementRef, private sanitizer: DomSanitizer, private logger: Logger) {}

	lensFocusChanged(pan: ZoomLensPanPixelsRawEvent) {
		this.lensCmp.moveTo(pan.left, pan.top);

		this.pan.emit({
			left: pan.left,
			top: pan.top,
			containerWidth: parseFloat(this.containerWidth),
			containerHeight: parseFloat(this.containerHeight)
		});
	}
}