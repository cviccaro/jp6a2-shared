export * from './navbar.component';
export * from './navbar.service';
export * from './mobile-menu/index';

import { NavbarComponent } from './navbar.component';
import { MobileMenuComponent, MobileMenuItemDirective, MobileMenuTriggerComponent } from './mobile-menu/index';

export const NAV_COMPONENTS = [
	NavbarComponent,
	MobileMenuComponent,
	MobileMenuItemDirective,
	MobileMenuTriggerComponent
];
