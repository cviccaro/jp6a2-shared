import { Component } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'balloon-text',
	template: '<ng-content></ng-content>',
	styleUrls: [ './balloon-text.component.css' ]
})
export class BalloonTextComponent {}
