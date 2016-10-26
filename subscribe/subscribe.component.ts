import { Component, OnInit } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'jp-subscribe',
	templateUrl: './subscribe.component.html',
	styleUrls: [ './subscribe.component.css' ]
})
export class SubscribeComponent implements OnInit {
	active = false;

	ngOnInit() {
		this.active = true;
	}
}
