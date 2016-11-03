import { Component, Input, HostBinding, AfterViewInit } from '@angular/core';

@Component({
	selector: 'jp-card',
	moduleId: module.id,
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.css']
})
export class CardComponent implements AfterViewInit {
	@Input() author: string;
	@Input() body: string;
	@Input() cardTitle: string;
	@Input() date: any;
	@Input() href = '#';
	@Input() image: any;
	@Input() jpHoverDynamicsMobile = false;
	@Input() overlay: any;
	@Input() route: any;
	@Input() subTitle: string;
	@Input() summary: string;
	@Input() theme: string = 'card';
	@Input() tag: string;

	hasRoute = false;

	ngAfterViewInit() {
		this.hasRoute = this.route !== undefined;
	}

	@HostBinding('class.has-overlay') public get hasOverlayClass() {
		return this.overlay !== null && this.overlay !== undefined;
	}

	@HostBinding('class.theme-card') public get hasThemeCardClass() {
		return this.theme === 'card';
	}

	@HostBinding('class.theme-post') public get hasThemePostClass() {
		return this.theme === 'post';
	}
}
