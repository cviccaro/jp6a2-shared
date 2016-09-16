import { Component, Input, EventEmitter, Output, HostListener } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'jp-balloon-callout-icon',
	template: '<ng-content></ng-content>',
	styleUrls: [ './balloon-callout-icon.component.css' ]
})
export class BalloonCalloutIconComponent {
	@Output() hover = new EventEmitter();
	@Output() leave = new EventEmitter();

	@Input() text: string;

	@HostListener('mouseenter')
	onHover(e: any) {
		this.hover.emit({event: e, text: this.text});
	}

	@HostListener('mouseleave')
	onLeave(e: any) {
		this.leave.emit({event: e, text: this.text});
	}
}
