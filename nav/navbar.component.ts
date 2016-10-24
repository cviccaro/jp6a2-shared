import { Component, OnInit, AfterViewInit, ElementRef, HostListener, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { NavbarService } from './navbar.service';
import { XhrService } from './../xhr/xhr.service';
import { Config, IconButtonComponent } from '../index';
import { Subscription } from 'rxjs/Rx';

declare var jQuery: any;

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'jp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
	divisions:any = ['creative', 'interactive', 'mdm', 'publishing'];
	links:any = {};
	subs: Subscription[];
	working = false;

	@ViewChildren(IconButtonComponent) public buttons: QueryList<IconButtonComponent>;

	constructor(
		public navbarService: NavbarService,
		public el: ElementRef,
		public xhr: XhrService
	) {
		const onProdServer = window.location.hostname.match(/\.jpenterprises\.com$/) !== null;
		const host =  onProdServer ? 'jpenterprises.com' : 'jpedev.com';
		const mainSubdomain = onProdServer ? 'www' : 'six';

		this.divisions.forEach((division:string) => {
			this.links[division] = `${window.location.protocol}//${division}.${host}`;
		});

		this.links.main = `${window.location.protocol}//${mainSubdomain}.${host}`;
	}

	ngOnInit() {
		this.navbarService.register(this.el);
		// this.navbarService.startListening();

		this.subs = [
			this.xhr.started.subscribe(() => this.working = true),
			this.xhr.done.subscribe(() => this.working = false)
		];
	}

	ngAfterViewInit() {
		if (Config.division) {
			this.buttons.forEach(button => {
				if (button.el.nativeElement.classList.contains(Config.division)) {
					button.el.nativeElement.classList.add('active');
				}
			});
		}
	}

	@HostListener('document:scroll')
	onScroll() {
		this.navbarService.onScroll();
	}

	ngOnDestroy() {
		this.subs.forEach(sub => {
		  if (sub) sub.unsubscribe();
		});
	}

	buttonClicked(e: Event) {
		let selector = jQuery(e.target).parents('a').attr('href').replace('/','');
		this.navbarService.buttonClicked.emit({target: e.target, selector: selector});
	}
}
