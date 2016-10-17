import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { MobileMenuItemDirective } from './mobile-menu-item.directive';
import { MobileMenuService } from './mobile-menu.service';
import { NavbarService } from '../navbar.service';

@Component({
	selector: 'jp-mobile-menu',
	moduleId: module.id,
	templateUrl: './mobile-menu.component.html',
	styleUrls: ['./mobile-menu.component.css']
})

export class MobileMenuComponent implements AfterContentInit {
	@ContentChildren(MobileMenuItemDirective) public contentLinks: QueryList<MobileMenuItemDirective>;

	mainSiteUrl:string;

	constructor(private _service: MobileMenuService, private _navbarService: NavbarService) {
		const isLive = window.location.hostname.match('/jpenterprises.com') !== null;
		this.mainSiteUrl = isLive ? '//www.jpenterprises.com' : '//six.jpedev.com';
	}

	ngAfterContentInit() {
		this.contentLinks.forEach((item: MobileMenuItemDirective) => {
			item.clicked.subscribe((e: Event) => {
				this.closeMenu();
			});
		});
	}

	closeMenu() {
		this._service.close();
		//this._navbarService.unsnap();
	}

	isActive() {
		return this._service.isActive();
	}
}
