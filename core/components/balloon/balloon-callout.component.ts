import { Component, ContentChildren, QueryList } from '@angular/core';
import { BalloonCalloutIconComponent } from './balloon-callout-icon.component';

@Component({
	moduleId: module.id,
	selector: 'balloon-callout',
	template: '<ng-content></ng-content>',
	styleUrls: [ './balloon-callout.component.css' ]
})
export class BalloonCalloutComponent {
	@ContentChildren(BalloonCalloutIconComponent) public calloutIcons: QueryList<BalloonCalloutIconComponent>;
}
