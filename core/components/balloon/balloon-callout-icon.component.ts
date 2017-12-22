import { Component, Input, EventEmitter, Output, HostListener } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'jp-balloon-callout-icon',
	template: '<a [href]="url"><ng-content></ng-content></a>',
	styleUrls: [ './balloon-callout-icon.component.css' ]
})
export class BalloonCalloutIconComponent {
	@Output() hover = new EventEmitter();
	@Output() leave = new EventEmitter();

	@Input() text: string;
	@Input() url = '#';

	@HostListener('mouseenter', ['$event'])
	onHover(e: any) {
		this.hover.emit({event: e, text: this.text});
	}

	@HostListener('mouseleave', ['$event'])
	onLeave(e: any) {
		this.leave.emit({event: e, text: this.text});
	}
}
