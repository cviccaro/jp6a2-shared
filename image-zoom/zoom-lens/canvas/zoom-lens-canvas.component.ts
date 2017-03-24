import { Component, HostListener, EventEmitter, Output } from '@angular/core';
import { Logger } from '../../../logger/logger.service';
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
			top: e.offsetY
		});
	}

	// @HostListener('mouseleave', ['$event'])
	// onMouseLeave(e: any) {
	// 	this.logger.log('Mouse left canvas!  time to kill everything!', e);
	// }

	constructor(private logger: Logger) {}
}
