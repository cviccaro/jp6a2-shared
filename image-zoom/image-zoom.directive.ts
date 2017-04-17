import { Directive, HostListener, ComponentRef, ElementRef, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ImageZoomerComponent } from './image-zoomer.component';
import { JpImageZoomer } from './image-zoomer';
import { Logger } from '../logger/logger.service';

@Directive({
	selector: '[jp-image-zoom]',
})
export class ImageZoomDirective implements OnDestroy {
	@Input('jp-image-zoom-mode') mode = 'outside';
	@Input('jp-image-zoom-bg-mode') bgMode = 'fit';
	@Input('jp-image-zoom-lens-width') lensWidth = '100px';
	@Input('jp-image-zoom-lens-height') lensHeight = '100px';
	@Input('jp-image-zoom-lens-shape') lensShape = 'square';

	private zoomerOpen = false;
	private zoomerRef: ComponentRef<ImageZoomerComponent>
	private zoomerOpened: Subscription;
	private revealTimer: any;

	constructor(
		private logger: Logger,
		private imageZoomer: JpImageZoomer,
		public el: ElementRef
	) {}

	ngOnInit() {
		this.logger.log('ImageZoomDirective initialized', this);
	}

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