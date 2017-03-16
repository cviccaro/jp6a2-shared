import { Directive, OnInit, HostListener, ComponentRef, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ImageZoomerComponent } from './image-zoomer.component';
import { JpImageZoomer } from './image-zoomer';
import { Logger } from '../logger/logger.service';

@Directive({
	selector: '[jp-image-zoom]',
})
export class ImageZoomDirective implements OnInit {
	private zoomerOpen = false;
	private zoomerRef: ComponentRef<ImageZoomerComponent>
	private revealTimer: any;

	constructor(
		private logger: Logger,
		private imageZoomer: JpImageZoomer,
		public el: ElementRef
	) {}

	@HostListener('mouseenter', ['$event'])
	onMouseEnter(e: any) {
		this.logger.log('Mouse Enter: ', e);
		clearTimeout(this.revealTimer);
		this.revealTimer = setTimeout(() => {
			this.openZoomer();
		});
	}

	@HostListener('mousemove', ['$event'])
	onMouseMove(e: any) {
		if (this.zoomerOpen) {
			//this.logger.log('Mouse Move During Hover: ', e);
		}
	}

	@HostListener('mouseleave', ['$event'])
	onMouseLeave(e: any) {
		clearTimeout(this.revealTimer);
		this.logger.log('Mouse Leave: ', e);
		this.closeZoomer();
	}

	openZoomer() {
		this.zoomerOpen = true;
		this.imageZoomer.open(this).subscribe((...args: any[]) => {
			this.logger.log('Image Zoomer opened!', args);
		});
	}

	closeZoomer() {
		this.zoomerOpen = false;
		this.imageZoomer.close(this);
	}

	ngOnInit() {
		this.logger.log('ImageZoomDirective initialized', this);
	}
}