import { Directive, HostListener, ComponentRef, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ImageZoomerComponent } from './image-zoomer.component';
import { JpImageZoomer } from './image-zoomer';
import { Logger } from '../../services/logger.service';

@Directive({
	selector: '[jp-image-zoom]',
})
export class ImageZoomDirective implements OnInit, OnDestroy {
	/**
	 * Input properties
	 */
	@Input('jp-image-zoom-mode') mode = 'outside';
	@Input('jp-image-zoom-bg-mode') bgMode = 'fit';
	@Input('jp-image-zoom-lens-width') lensWidth = '100px';
	@Input('jp-image-zoom-lens-height') lensHeight = '100px';
	@Input('jp-image-zoom-lens-shape') lensShape = 'square';
	@Input('jp-image-zoom-amount') zoomAmount = 1;

	/**
	 * Class properties
	 */
	public imageNaturalWidth: number;
	public imageNaturalHeight: number;

	private zoomerOpen = false;
	private zoomerRef: ComponentRef<ImageZoomerComponent>;
	private zoomerOpened: Subscription;
	private revealTimer: any;

	/**
	 * Event Listeners
	 */
	@HostListener('mouseenter', ['$event'])
	onMouseEnter(e: any) {
		clearTimeout(this.revealTimer);

		this.revealTimer = setTimeout(() => {
			this.openZoomer();
		});
	}

	/**
	 * Constructor
	 *
	 * @param {Logger}        private logger
	 * @param {JpImageZoomer} private imageZoomer
	 * @param {ElementRef}    public  el
	 */
	constructor(private logger: Logger, private imageZoomer: JpImageZoomer, public el: ElementRef) { }

	/**
	 * Component initialized, before View Initializes
	 */
	ngOnInit() {
		if (this.el.nativeElement.tagName === 'IMG') {
			this.el.nativeElement.addEventListener('load', () => {
				this.imageNaturalWidth = this.el.nativeElement.naturalWidth;
				this.imageNaturalHeight = this.el.nativeElement.naturalHeight;
			});
		} else if (this.el.nativeElement.style.backgroundImage) {
			const matched = this.el.nativeElement.style.backgroundImage.match(/url\([\"|\'](.*)[\"|\']\)/);

			if (matched !== null && matched.length === 2) {
				const url = matched[1];
				const img = new Image();
				img.src = url;

				img.addEventListener('load', (e: any) => {
					this.imageNaturalWidth = e.path[0].naturalWidth;
					this.imageNaturalHeight = e.path[0].naturalHeight;
				});
			}
		}
	}

	/**
	 * Open the image-zoomer
	 */
	openZoomer() {
		if (this.zoomerOpen) {
			this.closeZoomer();
		}

		this.zoomerOpen = true;
		this.zoomerOpened = this.imageZoomer.open(this).subscribe(() => {
			//
		});
	}

	/**
	 * Close the image-zoomer
	 */
	closeZoomer() {
		this.zoomerOpen = false;
		this.imageZoomer.close(this);
	}

	/**
	 * Garbage Collection
	 */
	ngOnDestroy() {
		if (this.zoomerOpened) {
			this.zoomerOpened.unsubscribe();
		}
	}
}
