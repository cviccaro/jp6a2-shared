import { Component, AfterViewInit, ElementRef } from '@angular/core';

import { Logger } from '../logger/logger.service';

@Component({
	moduleId: module.id,
	selector: 'jp-image-zoomer',
	templateUrl: './image-zoomer.component.html',
	styleUrls: [ './image-zoomer.component.css' ]
})
export class ImageZoomerComponent implements AfterViewInit {
	public imageUrl: string = 'NO URL SET!';

	constructor(private logger: Logger, public element: ElementRef) {}

	ngAfterViewInit() {
		this.logger.log('ImageZoomerComponent View Initialized.', this);
	}
}