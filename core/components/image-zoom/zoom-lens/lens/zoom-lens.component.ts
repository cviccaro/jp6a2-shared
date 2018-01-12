import { Component, HostBinding, ElementRef, OnInit, AfterViewInit, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Logger } from '../../../../services/logger.service';

@Component({
	moduleId: module.id,
	selector: 'jp-image-zoom-lens',
	template: '<div class="sheen" *ngIf="mode === \'inline\'"></div>',
	styleUrls: [ './zoom-lens.component.css' ]
})
export class ImageZoomLensComponent implements OnInit, AfterViewInit {
	/**
	 * Class properties
	 */
	canvasWidth: number;
	canvasHeight: number;

	elementHeight: number;
	elementWidth: number;

	@Input() imageUrl: string;
	@Input() mode = 'outside';
	@Input() lensWidth: string;
	@Input() lensHeight: string;
	@Input() shape = 'square';
	@Input() backgroundWidth: number;
	@Input() backgroundHeight: number;
	@Input() zoomAmount: number;

	/**
	 * Style bindings
	 */
	@HostBinding('style.height')
	public get cssStyleHeight() {
		if (this.lensHeight) return `${parseInt(this.lensHeight, 10)}px`;
		return null;
	}

	@HostBinding('style.width')
	public get cssStyleWidth() {
		if (this.lensWidth) return `${parseInt(this.lensWidth, 10)}px`;

		return null;
	}

	@HostBinding('style.left')
	positionLeft: string;

	@HostBinding('style.top')
	positionTop: string;

	@HostBinding('style.background-image')
	safeBackgroundImage: SafeStyle;

	@HostBinding('style.background-position')
	safeBackgroundPosition: SafeStyle;

	@HostBinding('style.background-size')
	safeBackgroundSize: SafeStyle;

	/**
	 * CSS Class bindings
	 */
	@HostBinding('class.is-visible')
	isVisible = false;

	@HostBinding('class.mode-inline') get willApplyCSSClassModeInline() {
		return this.mode === 'inline';
	}

	@HostBinding('class.circular') get willApplyCSSClassCircular() {
		return this.shape === 'circle';
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
	 * Component initializion, before View initilaizes
	 */
	ngOnInit() {
		if (this.mode === 'inline' && this.imageUrl) {
			this.safeBackgroundImage = this.sanitizer.bypassSecurityTrustStyle(`url(${this.imageUrl})`);
			if (this.backgroundWidth && this.backgroundHeight) {
				this.safeBackgroundSize = this.sanitizer.bypassSecurityTrustStyle(
					`${this.backgroundWidth * this.zoomAmount}px ${this.backgroundHeight * this.zoomAmount}px`
				);
			}
		}

		this.logger.log('ZoomLensComponent Initialized', this);
	}

	/**
	 * Component View initialized
	 */
	ngAfterViewInit() {
		// Store the size of the lens
		this.elementWidth = parseInt(this.element.nativeElement.offsetWidth, 10);
		this.elementHeight = parseInt(this.element.nativeElement.offsetHeight, 10);

		// Store the size of the canvas
		this.canvasWidth = parseInt(this.element.nativeElement.parentElement.offsetWidth, 10);
		this.canvasHeight = parseInt(this.element.nativeElement.parentElement.offsetHeight, 10);

		setTimeout(() => this.isVisible = true);

		this.logger.log('ZoomLensComponent View initialized: ', this);
	}

	/**
	 * Move the Lens
	 *-----------------
	 * Adjust the position for size of lens
	 *
	 * @param {number} left
	 * @param {number} top
	 */
	moveTo(left: number, top: number) {
		this.positionLeft = left + 'px';
		this.positionTop = top + 'px';
	}

	/**
	 * Pan the background
	 * -------------------
	 * Multiply it by the zoom amount
	 *
	 * @param {number} left [description]
	 * @param {number} top  [description]
	 */
	panBackground(left: number, top: number) {
		if (this.mode === 'inline') {
			this.safeBackgroundPosition = this.sanitizer.bypassSecurityTrustStyle(`${left * this.zoomAmount}px ${top * this.zoomAmount}px`);
		}
	}
}
