import { Component, ContentChild, AfterViewInit } from '@angular/core';

import { BalloonCalloutComponent } from './balloon-callout.component';
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

	@ContentChild(BalloonCalloutComponent) public calloutCmp: BalloonCalloutComponent;

	ngAfterViewInit() {
		if (this.calloutCmp) {
			this.calloutCmp.calloutIcons.forEach((item: BalloonCalloutIconComponent) => {
				item.hover.subscribe((e: any) => {
					this.calloutIsHovering = true;
					this.calloutHoverText = e.text;
				});
				item.leave.subscribe((e: any) => {
					this.calloutIsHovering = false;
				});
			});
		}
	}
}
