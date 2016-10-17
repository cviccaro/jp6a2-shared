import { Component, Input } from '@angular/core';

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
}
