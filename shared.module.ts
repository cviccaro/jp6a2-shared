import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MdButtonModule,
  MdIconModule,
  MdIconRegistry,
  MdInputModule,
  MdGridListModule,
  MdToolbarModule,
  MdProgressBarModule,
  MdRippleModule,
  OVERLAY_PROVIDERS
} from '@angular/material';

import { AgmCoreModule } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import { MomentModule } from 'angular2-moment';
import { ReCaptchaModule } from 'angular2-recaptcha';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
// import { InlineSVGModule } from 'ng-inline-svg';

import { BackgroundDirective } from './core/components/background/background.directive';
import { BlogComponent } from './blog/blog.component';
import { BlogsComponent } from './blog/blogs.component';
import { CardComponent } from './core/components/card/card.component';
import { ContentOverlayComponent } from './core/components/content-overlay/content-overlay.component';
import { DisqusComponent } from './core/components/disqus/disqus.component';
import { WindowProviders } from './core/components/disqus/window';
import { FooterComponent } from './core/components/footer/footer.component';
import { LogoComponent } from './core/components/logo/logo.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ProjectComponent } from './project/project.component';
import { ScrollToComponent } from './core/components/scroll/scroll-to.component';
import { SplashComponent } from './core/components/splash/splash.component';
import { SubscribeComponent } from './core/forms/subscribe/subscribe.component';
import { StaffModalComponent } from './staff/staff-modal.component';
import { ImageZoomDirective } from './core/components/image-zoom/image-zoom.directive';
import { ImageZoomerComponent } from './core/components/image-zoom/image-zoomer.component';
import { ImageZoomLensComponent } from './core/components/image-zoom/zoom-lens/lens/zoom-lens.component';
import { ImageZoomLensCanvasComponent } from './core/components/image-zoom/zoom-lens/canvas/zoom-lens-canvas.component';
import { ImageZoomLensContainerComponent } from './core/components/image-zoom/zoom-lens/container/zoom-lens-container.component';

import { BlogService } from './blog/blog.service';
import { BlogGuard } from './blog/blog.guard';
import { BlogsGuard } from './blog/blogs.guard';
import { CacheService } from './core/services/cache.service';
import { CaptchaService } from './core/forms/captcha.service';
import { ClientService } from './client/client.service';
import { ConfigService } from './core/config/config.service';
import { DivisionService } from './division/division.service';
import { GeolocateService } from './core/components/map/geolocate.service';
import { MobileMenuService } from './core/components/nav/mobile-menu/mobile-menu.service';
import { NavbarService } from './core/components/nav/navbar.service';
import { ScrollService } from './core/components/scroll/scroll.service';
import { StaffService } from './staff/staff.service';
import { FormSubmissionService } from './core/forms/contact-form/form-submission.service';
import { ProjectService } from './project/project.service';
import { ProjectGuard } from './project/project.guard';
import { ApiHttp } from './core/services/xhr.http';
import { XhrService } from './core/services/xhr.service';
 
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
  ProjectService,
  StaffService,
  ScrollService,
  XhrService
];

export const APP_MIDDLEWARE = [
  BlogGuard,
  BlogsGuard,
  ProjectGuard
];

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule,
    MdButtonModule,
    MdIconModule,
    MdGridListModule,
    MdToolbarModule,
    MdRippleModule,
    MdInputModule,
    MdProgressBarModule,
    MomentModule,
    Ng2PageScrollModule,
    ReCaptchaModule,
    ModalModule,
    BootstrapModalModule,
    //InlineSVGModule
  ],
  declarations: [
    BackgroundDirective,
    BlogComponent,
    BlogsComponent,
    CardComponent,
    ContentOverlayComponent,
    DisqusComponent,
    FooterComponent,
    LogoComponent,
    PrivacyComponent,
    ProjectComponent,
    ScrollToComponent,
    SplashComponent,
    SubscribeComponent,
    StaffModalComponent,
    ImageZoomDirective,
    ImageZoomerComponent,
    ImageZoomLensComponent,
    ImageZoomLensCanvasComponent,
    ImageZoomLensContainerComponent
  ],
  exports: [
    BackgroundDirective,
    BlogComponent,
    BlogsComponent,
    CardComponent,
    ContentOverlayComponent,
    DisqusComponent,
    FooterComponent,
    LogoComponent,
    PrivacyComponent,
    ProjectComponent,
    ScrollToComponent,
    SplashComponent,
    SubscribeComponent,
    StaffModalComponent,
    ImageZoomDirective,
    ImageZoomerComponent,
    ImageZoomLensComponent,
    ImageZoomLensCanvasComponent,
    ImageZoomLensContainerComponent,

    ImageZoomDirective,
    ImageZoomerComponent,
    ImageZoomLensComponent,
    ImageZoomLensCanvasComponent,
    ImageZoomLensContainerComponent,

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule,
    MdButtonModule,
    MdIconModule,
    MdGridListModule,
    MdToolbarModule,
    MdRippleModule,
    MdInputModule,
    MdProgressBarModule,
    MomentModule,
    Ng2PageScrollModule,
    ReCaptchaModule,
    ModalModule,
    BootstrapModalModule
  ],
  entryComponents: [StaffModalComponent, ImageZoomerComponent, ImageZoomLensContainerComponent, ImageZoomLensCanvasComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        APP_MIDDLEWARE,
        APP_SERVICES,
        MdIconRegistry,
        OVERLAY_PROVIDERS,
        WindowProviders,
        GoogleMapsAPIWrapper
      ]
    };
  }
}
