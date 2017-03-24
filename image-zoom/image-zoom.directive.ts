import { Directive, HostListener, ComponentRef, ElementRef, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ImageZoomerComponent } from './image-zoomer.component';
import { JpImageZoomer } from './image-zoomer';
import { Logger } from '../logger/logger.service';

@Directive({
	selector: '[jp-image-zoom]',
})
export class ImageZoomDirective implements OnDestroy {
	@Input() imageZoomMode = 'default';

	private zoomerOpen = false;
	private zoomerRef: ComponentRef<ImageZoomerComponent>
	private zoomerOpened: Subscription;
	private revealTimer: any;

	constructor(
		private logger: Logger,
		private imageZoomer: JpImageZoomer,
		public el: ElementRef
	) {}

	@HostListener('mouseenter', ['$event'])
	onMouseEnter(e: any) {
		clearTimeout(this.revealTimer);

		this.revealTimer = setTimeout(() => {
			this.openZoomer();
		});
	}

	openZoomer() {
		this.zoomerOpen = true;
		this.zoomerOpened = this.imageZoomer.open(this).subscribe(() => { });
	}

	closeZoomer() {
		this.zoomerOpen = false;
		this.imageZoomer.close(this);
	}

	ngOnDestroy() {
		if (this.zoomerOpened) {
			this.zoomerOpened.unsubscribe();
		}
	}
}