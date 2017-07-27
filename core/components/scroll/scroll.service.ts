import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { PageScrollInstance, PageScrollService } from 'ng2-page-scroll';

@Injectable()
export class ScrollService {
	private _lastScrollPos = 0;

	constructor(@Inject(DOCUMENT) private document: any, private scroller: PageScrollService) {
		window.addEventListener('scroll', (e) => {
			if (window.pageYOffset !== 0) {
				this._lastScrollPos = window.pageYOffset;
			}
		});
	}

	getLastScrollPos() {
		return this._lastScrollPos;
	}

	scrollToElementAnimated(targetEl: HTMLElement|string) {
		const instance = PageScrollInstance.simpleInstance(this.document, targetEl);
		this.scroller.start(instance);
	}

	scrollElementInline(inlineEl: HTMLElement, targetEl: HTMLElement|string) {
		const instance = PageScrollInstance.simpleInlineInstance(this.document, targetEl, inlineEl);
		this.scroller.start(instance);
	}
}
