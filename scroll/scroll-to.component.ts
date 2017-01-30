import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { CacheService } from '../cache/index';
import { NavbarService } from '../nav/index';
import { Config } from '../config/index';
import { ScrollService } from './scroll.service';

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

	constructor(public route: ActivatedRoute, public title: Title, public cache: CacheService, public navbar: NavbarService, public scroll: ScrollService) {
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
			let site_title = 'JP Enterprises';

			if (this.config['main_site_title'] !== undefined) {
				site_title = this.config['main_site_title'];
			} else if (this.config['site_title'] !== undefined) {
				site_title = this.config['site_title'];
			}

			this.title.setTitle(`${site_title} | ${title}`);

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
