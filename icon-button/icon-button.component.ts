import { Component, Input, ElementRef } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'jp-icon-button',
	templateUrl: './icon-button.component.html',
	styleUrls: [ './icon-button.component.css' ],
})
export class IconButtonComponent {
	@Input() href: string = '#';

	constructor(public el: ElementRef) { }
}
