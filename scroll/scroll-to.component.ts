import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { CacheService } from '../cache/index';
import { NavbarService } from '../nav/index';
import { Config } from '../config/index';
import { ScrollService } from './scroll.service';
import { TitleService } from '../title/title.service';

@Component({
	selector: 'jp-scroll-to',
	template: ''
})
export class ScrollToComponent implements AfterViewInit, OnDestroy {
	config: any;
	delay = 1000;
	currentSelector: string;

	private sub: Subscription;
	private sub2: Subscription;

	constructor(public route: ActivatedRoute, public title: TitleService, public cache: CacheService, public navbar: NavbarService, public scroll: ScrollService) {
		this.config = this.cache.get('config');
	}

	ngAfterViewInit() {
		this.sub = this.route.params.subscribe(params => {
			if (params.hasOwnProperty('selector')) {
				this.scrollToSelector(params['selector']);
			}
		});

		this.sub2 = this.navbar.buttonClicked.subscribe((e: {target: HTMLElement, selector: string}) => {
			if (this.currentSelector === e.selector) {
				this.scrollToSelector(e.selector);
			}
		});

		setTimeout(() => this.delay = 0, 1000);
	}

	capitalize(text: string) {
		return text.substr(0,1).toUpperCase() + text.substr(1,text.length-1);
	}

	scrollToSelector(selector: string) {
		let el = document.getElementById(selector.replace('-', '_'));

		if (el) {
			this.currentSelector = selector;

			let title = this.capitalize(selector.replace('-', ' '));

			this.title.setTitle(title);

			setTimeout(() => {
				this.scroll.scrollToElementAnimated('#' + selector.replace('-', '_'));
				this.delay = 0;
			}, this.delay);
		}
	}

	ngOnDestroy() {
		if (this.sub) this.sub.unsubscribe();
		if (this.sub2) this.sub2.unsubscribe();
	}
}
