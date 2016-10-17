import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
	selector: 'jp-post',
	moduleId: module.id,
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.css']
})
export class PostComponent implements AfterViewInit {
	@Input() title: string;
	@Input() text: string;
	@Input() longText: string;
	@Input() image: string;
	@Input() date: any;
	@Input() tag: string;
	@Input() author: string;
	@Input() url: string;
	@Input() routerLink: any;
	@Input() animateIn = false;

	private animating = true;

	ngAfterViewInit() {
		if (this.animateIn) {
			setTimeout(() => this.animating = false, 1);
		}
	}
}
