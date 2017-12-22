import { Injectable, ElementRef, Output, EventEmitter, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class NavbarService {
	animatingHide = false;
	animatingShow = false;
	el: ElementRef;
	elemTop: number;
	elemBottom: number;
	navWrapperEl: HTMLElement;
	listening = false;
	lastScrollPos: number;
	lastDirection: string;
	snapped = false;
	showTimer: any;
	hideTimer: any;
	unsnapTimer: any;
	transitionEvents = 'transitionend webkitTransitionEnd MSTransitionEnd oTransitionEnd mozTransitionEnd';

	@Output() buttonClicked = new EventEmitter();

	constructor(@Inject(DOCUMENT) private document: any) {}

	onScroll() {
		if (!this.listening) return;

		if (this.el && this.listening && window.pageYOffset > 0) {
			const scrollY = window.pageYOffset;
			const direction = (scrollY < this.lastScrollPos) ? 'up' : 'down';

			this.lastScrollPos = window.pageYOffset;

			if (scrollY > this.elemBottom && this.lastDirection === direction) {
				if (this.el.nativeElement.classList.contains('snapped') && !this.animatingShow) {
				    this.snapIn();
				}
				// if (direction === 'up' && !this.$elem.hasClass('snapped') && !this.animatingShow) {
				// 	this.snapIn();
				// } else if (direction === 'down' && this.$elem.hasClass('snapped') && !this.animatingHide) {
				// 	this.snapOut();
				// }
			} else if (scrollY <= this.elemTop && this.el.nativeElement.classList.contains('snapped')) {
				this.unsnap();
			}

			this.lastDirection = direction;
		}
	}


	isSnapped() {
		return this.snapped;
	}

	killTimers() {
		if (this.hideTimer) {
			clearTimeout(this.hideTimer);
		}
		if (this.showTimer) {
			clearTimeout(this.showTimer);
		}
	}

	wrapNav() {
		const navWrapper = this.document.createElement('NAV');
		this.el.nativeElement.parentElement.insertBefore(navWrapper, this.el.nativeElement);
		navWrapper.appendChild(this.el.nativeElement);
	}

	register(el: ElementRef) {
		this.el = el;

		if (this.el.nativeElement.parentElement.tagName !== 'NAV') {
			this.wrapNav();
		}

		this.navWrapperEl = this.el.nativeElement.parentElement;

		setTimeout(() => {
			const rect = this.navWrapperEl.getBoundingClientRect();
			const clientTop = rect.top + this.document.body.scrollTop;

			this.elemTop = clientTop;
			this.elemBottom = clientTop + this.navWrapperEl.offsetHeight;
		}, 1);
	}

	snapIn() {
		const that = this;

		this.animatingShow = true;
		this.killTimers();

		this.el.nativeElement.classList.remove('snap-out', 'snap-out-active');
		this.el.nativeElement.classList.add('snap-in', 'snapped');

		this.showTimer = setTimeout(() => {
				this.bindTransitionEvents(function(e: Event) {
					if (e.target === this) {
						that.unbindTransitionEvents();
						that.animatingShow = false;
						that.snapped = true;
					}
				});
				this.el.nativeElement.classList.add('snap-in-active');
		}, 250);
	}

	bindTransitionEvents(fn: Function) {
		this.transitionEvents.split(' ').forEach(e => {
			this.el.nativeElement.addEventListener(e, fn);
		});
	}

	unbindTransitionEvents() {
		this.transitionEvents.split(' ').forEach(e => {
			this.el.nativeElement.removeEventListener(e);
		});
	}

	snapOut() {
		const that = this;
		const transitionEvents = this.transitionEvents;

		this.animatingHide = true;
		this.killTimers();

		this.hideTimer = setTimeout(() => {
			this.el.nativeElement.classList.remove('snap-in', 'snap-in-active', 'snapped');
			this.el.nativeElement.classList.add('snap-out');
			setTimeout(() => {
				this.bindTransitionEvents(function(e: Event) {
					if (e.target === this) {
						that.unbindTransitionEvents();
						that.snapped = true;
						setTimeout(() => that.unsnap());
						setTimeout(() => that.animatingHide = false, 500);
					}
				});
				this.el.nativeElement.classList.add('snap-out-active');
			});
		}, 250);
	}

	startListening() {
		this.listening = true;
	}

	stopListening() {
		this.listening = false;
	}

	unsnap() {
		this.snapped = false;
		this.el.nativeElement.classList.remove('snapped', 'snap-in', 'snap-in-active', 'snap-out', 'snap-out-active');
	}
}
