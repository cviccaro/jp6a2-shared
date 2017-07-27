import { Component, Input, Output, EventEmitter, HostBinding, HostListener, OnInit } from '@angular/core';

@Component({
	selector: 'jp-card',
	moduleId: module.id,
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
	@Input() author: string;
	@Input() body: string;
	@Input() cardTitle: string;
	@Input() date: any;
	@Input() href = '#';
	@Input() image: any;
	@Input() jpDynamicsMobile = false;
	@Input() overlay: any;
	@Input() route: any;
	@Input() subTitle: string;
	@Input() summary: string;
	@Input() theme: string = 'card';
	@Input() tag: string;

	hasRoute = false;
	hasHref = false;
	hasContentOverlay = false;

	@Output() clicked = new EventEmitter();

	@HostListener('click')
	onClick() {
		this.clicked.emit(this);
		return false;
	}

	ngOnInit() {
		this.hasRoute = this.route !== undefined;
		this.hasHref = this.href !== undefined;
		this.hasContentOverlay = this.overlay === true;
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
