import { Component, ElementRef, HostBinding, HostListener, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ImageZoomLensComponent } from '../lens/zoom-lens.component';
import { ImageZoomLensCanvasComponent } from '../canvas/zoom-lens-canvas.component';
import { ImageZoomDirective } from '../../image-zoom.directive';
import { ZoomLensPanPixelsEvent, ZoomLensPanPixelsRawEvent } from '../zoom-lens.interfaces';
import { Logger } from '../../../../services/logger.service';

@Component({
	moduleId: module.id,
	selector: 'jp-image-zoom-lens-container',
	templateUrl: './zoom-lens-container.component.html',
	styleUrls: [ './zoom-lens-container.component.css' ]
})
export class ImageZoomLensContainerComponent {
	/**
	 * Class Properties
	 */
	public lensWidth: string;
	public lensHeight: string;
	public lensShape: string;
	public bgMode: string;
	public imageNaturalWidth: number;
	public imageNaturalHeight: number;
	public directive: ImageZoomDirective;
	public zoomAmount: number;

	@Input() mode = 'outside';

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

	@HostBinding('style.background-size')
	public get backgroundSize(): SafeStyle|void {
		let styleString = 'cover';

		if (this.bgMode !== 'cover' && this.containerHeight && this.containerWidth) {
			styleString = `${this.containerWidth} ${this.containerHeight}`;
		}

		return this.sanitizer.bypassSecurityTrustStyle(styleString);
	}

	/**
	 * CSS Class bindings
	 */
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
	 * Event Emitters
	 */
	@Output() pan = new EventEmitter<ZoomLensPanPixelsEvent>();
	@Output() mouseDidLeave = new EventEmitter<any>();

	/**
	 * Event Listeners
	 */
	@HostListener('mouseleave', ['$event'])
	onMouseLeave(e: any) {
		this.mouseDidLeave.emit(e);
	}

	@HostListener('window:resize')
	onWindowResize() {
		this.containerWidth = this.directive.el.nativeElement.offsetWidth + 'px';
		this.containerHeight = this.directive.el.nativeElement.offsetHeight + 'px';
	}

	/**
	 * Constructor
	 *
	 * @param {ElementRef}   public  element
	 * @param {DomSanitizer} private sanitizer
	 * @param {Logger}       private logger
	 */
	constructor(public element: ElementRef, private sanitizer: DomSanitizer, private logger: Logger) {}

	/**
	 * Mouse panned in container
	 */
	lensFocusChanged(pan: ZoomLensPanPixelsRawEvent) {
		const canvasWidth = this.element.nativeElement.offsetWidth;
		const canvasHeight = this.element.nativeElement.offsetHeight;

		// Calculate the difference between the full-size image and the contianer it's being shown in
		const widthRatio = this.imageNaturalWidth / canvasWidth;
		const heightRatio = this.imageNaturalHeight / canvasHeight;

		// Get the size of the lens
		const lensWidth = this.lensCmp.element.nativeElement.offsetWidth;
		const lensHeight = this.lensCmp.element.nativeElement.offsetHeight;

		// Calculate the amount to pan the background
		let bgLeft = (pan.left * widthRatio - lensWidth / 2 / this.zoomAmount) * -1;
		const bgTop = Math.min(0, -1 * Math.min(pan.top * heightRatio - lensHeight / 2 / this.zoomAmount, this.imageNaturalHeight - lensHeight));

		// Calculate the difference between the overflowed image and the window width
		if (this.bgMode === 'cover') {
			const overflow = (this.imageNaturalWidth - canvasWidth) / 2;
			const containerCenter = canvasWidth / 2;
			const distanceFromCenter = -(containerCenter - pan.left);

			const distanceWeight = distanceFromCenter / containerCenter;
			const overflowPx = overflow * distanceWeight;

			bgLeft = bgLeft + overflowPx;
		}

		this.lensCmp.panBackground(bgLeft, bgTop);

		// Move the lens itself
		const lensLeft = Math.max(0, Math.min(pan.left - (lensWidth / 2), canvasWidth - lensWidth));
		const lensTop = Math.max(0, Math.min(pan.top - (lensHeight / 2), canvasHeight - lensHeight));

		this.lensCmp.moveTo(lensLeft, lensTop);

		this.pan.emit({
			left: pan.left,
			top: pan.top,
			containerWidth: canvasWidth,
			containerHeight: canvasHeight
		});
	}

	/**
	 * Configure the instance
	 */
	config(props: { [key: string] : any }) {
		for (let prop in props) {
			(<any>this)[prop] = props[prop];
		}

		this.logger.log('ZoomLensContainerComponent configured', this);
	}
}