import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class MobileMenuService {
	private active = false;
	private lastScrollPos = 0;

	constructor(@Inject(DOCUMENT) private document: any) {}

	isActive() {
		return this.active;
	}

	close() {
		this.active = false;

		this.document.body.classList.remove('scroll-disabled');
		this.document.body.style.top = '';

		window.scrollTo(0, this.lastScrollPos);
	}

	open() {
		this.active = true;
		this.lastScrollPos = window.pageYOffset;

		this.document.body.classList.add('scroll-disabled');
		this.document.body.style.top = -this.lastScrollPos + 'px';
	}
}
