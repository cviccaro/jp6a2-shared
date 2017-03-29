import { Component, HostBinding, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Logger } from '../../../logger/logger.service';

@Component({
	moduleId: module.id,
	selector: 'jp-image-zoom-lens',
	template: '',
	styleUrls: [ './zoom-lens.component.css' ]
})
export class ImageZoomLensComponent implements OnInit, AfterViewInit {
	canvasWidth: number;
	canvasHeight: number;

	elementHeight: number;
	elementWidth: number;
	
	constructor(public element: ElementRef, private logger: Logger) {}

	ngOnInit() {
		this.isVisible = true;
	}

	ngAfterViewInit() {
		this.elementWidth = parseInt(this.element.nativeElement.offsetWidth);
		this.elementHeight = parseInt(this.element.nativeElement.offsetHeight);

		this.canvasWidth = parseInt(this.element.nativeElement.parentElement.offsetWidth);
		this.canvasHeight = parseInt(this.element.nativeElement.parentElement.offsetHeight);

		this.logger.log('ZoomLens component view initialized: ', this);
	}

	@HostBinding('style.top')
	positionTop: string;

	@HostBinding('style.left')
	positionLeft: string;

	@HostBinding('class.is-visible')
	isVisible = false;

	moveTo(left: number, top: number) {
		this.positionLeft = Math.max(0, Math.min(left - (this.elementWidth / 2), this.canvasWidth - this.elementWidth)) + 'px';
		this.positionTop = Math.max(0, Math.min(top - (this.elementHeight / 2), this.canvasHeight - this.elementHeight)) + 'px';
	}
}
