import { Component, HostBinding, ElementRef } from '@angular/core';
import { Logger } from '../logger/logger.service';

@Component({
	moduleId: module.id,
	selector: 'jp-image-zoom-lens',
	template: '',
	styleUrls: [ './zoom-lens.component.css' ]
})
export class ImageZoomLensComponent {
	canvasWidth: number;
	canvasHeight: number;

	elementHeight: number;
	elementWidth: number;
	
	constructor(public element: ElementRef, private logger: Logger) {}

	ngAfterViewInit() {
		this.elementWidth = parseInt(this.element.nativeElement.offsetWidth);
		this.elementHeight = parseInt(this.element.nativeElement.offsetHeight);

		this.canvasWidth = parseInt(this.element.nativeElement.parentElement.offsetWidth);
		this.canvasHeight = parseInt(this.element.nativeElement.parentElement.offsetHeight);
	}

	@HostBinding('style.top')
	positionTop: string;

	@HostBinding('style.left')
	positionLeft: string;

	moveTo(left: number, top: number) {
		this.positionLeft = (left - (this.elementWidth / 2)) + 'px';
		this.positionTop = (top - (this.elementHeight / 2)) + 'px';
	}
}
