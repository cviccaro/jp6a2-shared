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

	divisions: any = ['creative', 'interactive', 'mdm', 'publishing'];
	links: any = {};

	constructor(private _service: MobileMenuService, private _navbarService: NavbarService) {
		const onProdServer = window.location.hostname.match(/\.jpenterprises\.com$/) !== null;
		const host =  onProdServer ? 'jpenterprises.com' : 'jpedev.com';
		const mainSubdomain = onProdServer ? 'www' : 'six';

		this.divisions.forEach((division: string) => {
			this.links[division] = `${window.location.protocol}//${division}.${host}`;
		});

		this.links.main = `${window.location.protocol}//${mainSubdomain}.${host}`;
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
