import { Component } from '@angular/core';

@Component({
	selector: 'jp-icon-button-text',
	template: '<ng-content></ng-content>'
})
export class IconButtonTextComponent {}

@Component({
	moduleId: module.id,
	selector: 'jp-icon',
	template: '<ng-content></ng-content>',
	styleUrls: [ './icon-base.component.css', './icon.component.css' ]
})
export class JpIconComponent {}

@Component({
	moduleId: module.id,
	selector: 'jp-icon-hover',
	template: '<ng-content></ng-content>',
	styleUrls: [ './icon-base.component.css', './icon-hover.component.css' ]
})
export class JpIconHoverComponent {}

@Component({
	moduleId: module.id,
	selector: 'jp-underline',
	template: '<ng-content></ng-content>',
	styleUrls: [ './underline.component.css' ]
})
export class JpUnderlineComponent {}
