 /**
 * This barrel file provides the exports for the shared resources (services, components).
 */
export * from './background/index';
export * from './balloon/index';
export * from './blog/index';
export * from './cache/index';
export * from './card/index';
export * from './client/index';
export * from './contact-form/index';
export * from './content-overlay/index';
export * from './config/index';
export * from './division/index';
export * from './footer/index';
export * from './gallery/index';
export * from './hover-dynamics/index';
export * from './icon-button/index';
export * from './logo/index';
export * from './map/index';
export * from './models/index';
export * from './navbar/index';
export * from './pager/index';
export * from './pipes/index';
export * from './post/index';
export * from './scroll/index';
export * from './social-icons/index';
export * from './social-share/index';
export * from './splash/index';
export * from './staff/index';
export * from './textarea-autoexpand/index';
export * from './validators/index';
export * from './work/index';
export * from './xhr/index';

import { BlogService } from './blog/blog.service';
import { CacheService } from './cache/cache.service';
import { CaptchaService } from './contact-form/captcha.service';
import { ClientService } from './client/client.service';
import { ConfigService } from './config/config.service';
import { DivisionService } from './division/division.service';
import { GeolocateService } from './map/geolocate.service';
import { MobileMenuService } from './navbar/mobile-menu/mobile-menu.service';
import { NavbarService } from './navbar/navbar.service';
import { ScrollService } from './scroll/scroll.service';
import { StaffService } from './staff/staff.service';
import { FormSubmissionService } from './contact-form/form-submission.service';
import { WorkService } from './work/work.service';
import { ApiHttp } from './xhr/xhr.http';
import { XhrService } from './xhr/xhr.service';

export const APP_SERVICES = [
  ApiHttp,
  BlogService,
  CacheService,
  CaptchaService,
  ClientService,
  ConfigService,
  DivisionService,
  FormSubmissionService,
  GeolocateService,
  MobileMenuService,
  NavbarService,
  StaffService,
  ScrollService,
  WorkService,
  XhrService
];
