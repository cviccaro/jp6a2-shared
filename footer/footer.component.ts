import { Component } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'jp-footer',
	templateUrl: './footer.component.html',
	styleUrls: [ './footer.component.css' ]
})
export class FooterComponent {
	year = new Date().getFullYear();
}
