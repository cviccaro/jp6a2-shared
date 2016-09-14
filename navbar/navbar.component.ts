import { Component, OnInit, AfterViewInit, ElementRef, HostListener, OnDestroy, ViewChildren, QueryList} from '@angular/core';
import { NavbarService } from './navbar.service';
import { XhrService } from './../xhr/xhr.service';
import { Config, IconButtonComponent } from '../index';
import { Subscription } from 'rxjs/Rx';

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
	subs: Subscription[];
	working = false;

	@ViewChildren(IconButtonComponent) public buttons: QueryList<IconButtonComponent>;

	constructor(public navbarService: NavbarService, public el: ElementRef, public xhr: XhrService) { }

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
}
