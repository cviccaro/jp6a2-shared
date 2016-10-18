import { Component, Input, HostBinding } from '@angular/core';

@Component({
	selector: 'jp-card',
	moduleId: module.id,
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.css']
})
export class CardComponent {
	@Input() cardTitle: string;
	@Input() subTitle: string;
	@Input() image: any;
	@Input() overlay: any;
	@Input() href = '#';
	@Input() routerLink: any = null;
	@Input() jpHoverDynamicsMobile = false;

	@HostBinding('class.has-overlay') public get hasOverlay() {
		return this.overlay !== null && this.overlay !== undefined;
	}
}
