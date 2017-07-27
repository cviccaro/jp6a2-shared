import { Component, HostListener, EventEmitter, ElementRef, Output } from '@angular/core';
import { Logger } from '../../../../services/logger.service';
import { ZoomLensPanPixelsRawEvent } from '../zoom-lens.interfaces';

@Component({
	moduleId: module.id,
	selector: 'jp-image-zoom-lens-canvas',
	template: '',
	styles: [ ':host { display: block; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 85; }' ]
})
export class ImageZoomLensCanvasComponent {
	@Output() pan = new EventEmitter<ZoomLensPanPixelsRawEvent>();

	@HostListener('mousemove', ['$event'])
	onMouseMove(e: MouseEvent) {
		this.pan.emit({
			left: e.offsetX,
			top: e.offsetY,
			event: e
		});
	}

	constructor(public el: ElementRef, private logger: Logger) {}
}
