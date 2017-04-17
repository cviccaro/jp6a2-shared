import { Component, HostBinding, ElementRef, OnInit, AfterViewInit, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Logger } from '../../../logger/logger.service';

@Component({
	moduleId: module.id,
	selector: 'jp-image-zoom-lens',
	template: '<div class="sheen" *ngIf="mode === \'inline\'"></div>',
	styleUrls: [ './zoom-lens.component.css' ]
})
export class ImageZoomLensComponent implements OnInit, AfterViewInit {
	canvasWidth: number;
	canvasHeight: number;

	elementHeight: number;
	elementWidth: number;

	@Input() imageUrl: string;
	@Input() mode = 'outside';
	@Input() lensWidth: string;
	@Input() lensHeight: string;
	@Input() shape = 'square';

	@HostBinding('style.height')
	public get cssStyleHeight() {
		if (this.lensHeight) return `${parseInt(this.lensHeight)}px`;
		return void(0);
	}

	@HostBinding('style.width')
	public get cssStyleWidth() {
		if (this.lensWidth) return `${parseInt(this.lensWidth)}px`;

		return void(0);
	}

	@HostBinding('style.top')
	positionTop: string;

	@HostBinding('style.left')
	positionLeft: string;

	@HostBinding('class.is-visible')
	isVisible = false;

	@HostBinding('style.background-image')
	safeBackgroundImage: SafeStyle;

	@HostBinding('class.mode-inline') get willApplyCSSClassModeInline() {
		return this.mode === 'inline';
	}

	@HostBinding('class.circular') get willApplyCSSClassCircular() {
		return this.shape === 'circle';
	}

	@HostBinding('style.background-position')
	safeBackgroundPosition: SafeStyle;

	// @HostBinding('style.background-size')
	// safeBackgroundSize: SafeStyle;

	constructor(public element: ElementRef, private sanitizer: DomSanitizer, private logger: Logger) {}

	ngOnInit() {
		if (this.mode === 'inline' && this.imageUrl) {
			this.safeBackgroundImage = this.sanitizer.bypassSecurityTrustStyle(`url(${this.imageUrl})`);
			//this.safeBackgroundSize = this.sanitizer.bypassSecurityTrustStyle()
		}

		this.logger.log('ZoomLensComponent Initialized', this);
	}

	ngAfterViewInit() {
		this.elementWidth = parseInt(this.element.nativeElement.offsetWidth);
		this.elementHeight = parseInt(this.element.nativeElement.offsetHeight);

		this.canvasWidth = parseInt(this.element.nativeElement.parentElement.offsetWidth);
		this.canvasHeight = parseInt(this.element.nativeElement.parentElement.offsetHeight);

		setTimeout(() => this.isVisible = true);

		this.logger.log('ZoomLensComponent View initialized: ', this);
	}

	moveTo(left: number, top: number) {
		this.positionLeft = Math.max(0, Math.min(left - (this.elementWidth / 2), this.canvasWidth - this.elementWidth)) + 'px';
		this.positionTop = Math.max(0, Math.min(top - (this.elementHeight / 2), this.canvasHeight - this.elementHeight)) + 'px';

		if (this.mode === 'inline') {
			this.safeBackgroundPosition = this.sanitizer.bypassSecurityTrustStyle(`${left / this.canvasWidth * 100}% ${top / this.canvasHeight * 100}%`);
		}
	}
}
