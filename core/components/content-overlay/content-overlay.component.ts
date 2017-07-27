import { Component, OnInit, Input, ElementRef, AfterViewInit, HostBinding, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarService } from '../nav/navbar.service';
import { ScrollService } from '../scroll/scroll.service';
import { Config } from '../config/env.config';
import { Subscription } from 'rxjs/Subscription';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
	moduleId: module.id,
	selector: 'jp-content-overlay',
	styleUrls: ['./content-overlay.component.css'],
	templateUrl: './content-overlay.component.html'
})

export class ContentOverlayComponent implements OnInit, AfterViewInit, OnDestroy {
	navbarWasListening: boolean = false;
	returnTo: string;
	sub: Subscription;

	@Input() title: string|boolean = false;

	@HostBinding('id') htmlId = 'content-overlay';
	@HostBinding('class.active') isActive = false;
	@HostBinding('hidden') isHidden = true;

	constructor(
		public el: ElementRef,
		public router: Router,
		public route: ActivatedRoute,
		public scrollService: ScrollService,
		public navbarService: NavbarService,
		@Inject(DOCUMENT) private document: any
	) {
		//
	}

	ngOnInit() {
		this.sub = this.route.data.subscribe(params => {
			if (params.hasOwnProperty('returnTo')) {
				this.returnTo = params['returnTo'];
			}
		});
	}

	ngAfterViewInit() {
		this.open();
	}

	close() {
		this.document.body.classList.remove('scroll-disabled');
		this.document.body.style.top = '';

		window.scrollTo(0, this.scrollService.getLastScrollPos());

		if (window.innerWidth >= Config.desktopWidth) {
			if (this.navbarWasListening) {
				//this.navbarService.snapOut();
				this.navbarService.startListening();
			}
		}

		this.isActive = false;
		this.isHidden = true;

		setTimeout(() => {
			if (this.returnTo !== undefined && this.returnTo !== null) {
				this.router.navigate([this.returnTo]);
			}
		},500);
	}

	open() {
		setTimeout(() => {
			this.isActive = true;
			this.isHidden = false;
			this.navbarWasListening = this.navbarService.listening;

			this.navbarService.snapIn();
			this.navbarService.stopListening();

			this.document.body.classList.add('scroll-disabled');
			this.document.body.style.top = -this.scrollService.getLastScrollPos() + 'px';
		}, 1);
	}

	ngOnDestroy() {
		if (this.sub) this.sub.unsubscribe();

		this.document.body.classList.remove('scroll-disabled');
		this.document.body.style.top = '';

		if (window.innerWidth >= Config.desktopWidth && !this.navbarService.animatingHide) {
			//this.navbarService.snapOut();
			this.navbarService.startListening();
		}
	}

	scrollUp() {
		this.scrollService.scrollElementInline(this.el.nativeElement, '#content_overlay_top');
	}
}
