import { Component, ElementRef, HostBinding, HostListener, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ImageZoomLensComponent } from '../lens/zoom-lens.component';
import { ImageZoomLensCanvasComponent } from '../canvas/zoom-lens-canvas.component';
import { ZoomLensPanPixelsEvent, ZoomLensPanPixelsRawEvent } from '../zoom-lens.interfaces';
import { Logger } from '../../../logger/logger.service';

@Component({
	moduleId: module.id,
	selector: 'jp-image-zoom-lens-container',
	templateUrl: './zoom-lens-container.component.html',
	styleUrls: [ './zoom-lens-container.component.css' ]
})
export class ImageZoomLensContainerComponent {
	@Input() mode = 'outside';
	public lensWidth: string;
	public lensHeight: string;
	public lensShape: string;

	@ViewChild(ImageZoomLensComponent) lensCmp: ImageZoomLensComponent;
	@ViewChild(ImageZoomLensCanvasComponent) canvasCmp: ImageZoomLensCanvasComponent;

	/**
	 * Style bindings
	 */
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

	@HostBinding('class.mode-inline') get willApplyCssClassModeInline() {
		return this.mode === 'inline';
	}

	@HostBinding('class.mode-outside') get willApplyCssClassModeOutside() {
		return this.mode === 'outside';
	}

	/**
	 * Image URL
	 */
	private _imageUrl: string;

	public set imageUrl(url: string) {
		this._imageUrl = url;
		this.safeBackgroundImage = this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
	}

	public get imageUrl() {
		return this._imageUrl;
	}

	/**
	 * Event emitters
	 */
	@Output() pan = new EventEmitter<ZoomLensPanPixelsEvent>();

	@Output() mouseDidLeave = new EventEmitter<any>();

	@HostListener('mouseleave', ['$event'])
	onMouseLeave(e: any) {
		this.mouseDidLeave.emit(e);
	}

	@HostBinding('style.background-size')
	private get backgroundSize(): SafeStyle|void {
		if (this.containerHeight && this.containerWidth) {
			return this.sanitizer.bypassSecurityTrustStyle(`${this.containerWidth} ${this.containerHeight}`);
		}
	}

	/**
	 * Constructor
	 */
	constructor(public element: ElementRef, private sanitizer: DomSanitizer, private logger: Logger) {}

	/**
	 * Mouse panned in container
	 */
	lensFocusChanged(pan: ZoomLensPanPixelsRawEvent) {
		this.lensCmp.moveTo(pan.left, pan.top);

		this.pan.emit({
			left: pan.left,
			top: pan.top,
			containerWidth: parseFloat(this.containerWidth),
			containerHeight: parseFloat(this.containerHeight)
		});
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