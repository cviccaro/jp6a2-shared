import { Component, ContentChildren, QueryList, AfterViewInit } from '@angular/core';

import { BalloonCalloutIconComponent } from './balloon-callout-icon.component';

@Component({
	selector: 'jp-balloon',
	moduleId: module.id,
	templateUrl: './balloon.component.html',
	styleUrls: [ './balloon.component.css' ]
})
export class BalloonComponent implements AfterViewInit {
	calloutIsHovering = false;
	calloutHoverText: string;

	@ContentChildren(BalloonCalloutIconComponent) public calloutIcons: QueryList<BalloonCalloutIconComponent>;

	ngAfterViewInit() {
		console.log(this.calloutIcons);
		this.calloutIcons.forEach(item => {
			item.hover.subscribe((e: any) => {
				console.log('hovering over icon');
				this.calloutIsHovering = true;
				this.calloutHoverText = e.text;
			});
			item.leave.subscribe((e: any) => {
				this.calloutIsHovering = false;
			});
		});
	}
}
