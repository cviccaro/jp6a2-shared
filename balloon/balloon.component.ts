import { Component, ContentChild, AfterViewInit } from '@angular/core';

import { BalloonCalloutComponent } from './balloon-callout.component';

@Component({
	selector: 'jp-balloon',
	moduleId: module.id,
	templateUrl: './balloon.component.html',
	styleUrls: [ './balloon.component.css' ]
})
export class BalloonComponent implements AfterViewInit {
	calloutIsHovering = false;
	calloutHoverText: string;

	@ContentChild(BalloonCalloutComponent) public calloutCmp;

	ngAfterViewInit() {
		if (this.calloutCmp) {
			this.calloutCmp.calloutIcons.forEach(item => {
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
