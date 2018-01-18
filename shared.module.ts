import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatCommonModule,
  MatButtonModule,
  MatIconModule,
  //MdIconRegistry,
  MatInputModule,
  MatGridListModule,
  MatToolbarModule,
  MatTooltipModule,
  MatProgressBarModule,
  MatRippleModule,
  //OVERLAY_PROVIDERS
} from '@angular/material';

import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { MomentModule } from 'angular2-moment';
import { ReCaptchaModule } from 'angular2-recaptcha';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { ModalModule, OverlayRenderer, DOMOverlayRenderer } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';

import { BackgroundDirective } from './core/components/background/background.directive';
import { BalloonComponent } from './core/components/balloon/balloon.component';
import { BalloonTextComponent } from './core/components/balloon/balloon-text.component';
import { BalloonCalloutComponent } from './core/components/balloon/balloon-callout.component';
import { BalloonCalloutIconComponent } from './core/components/balloon/balloon-callout-icon.component';
import { BlogComponent } from './blog/blog.component';
import { BlogsComponent } from './blog/blogs.component';
import { CardComponent } from './core/components/card/card.component';
import { ContactFormComponent } from './core/forms/contact-form/contact-form.component';
import { ContentOverlayComponent } from './core/components/content-overlay/content-overlay.component';
import { DisqusComponent } from './core/components/disqus/disqus.component';
import { WindowProviders } from './core/components/disqus/window';
import { DynamicsDirective } from './core/components/dynamics/dynamics.directive';
import { FooterComponent } from './core/components/footer/footer.component';
import { GalleryComponent } from './core/components/gallery/gallery.component';
import { GalleryItemDirective } from './core/components/gallery/gallery-item.directive';
import { IconButtonComponent } from './core/components/icon-button/icon-button.component';
import {
  IconButtonTextComponent,
  JpIconComponent,
  JpIconHoverComponent,
  JpUnderlineComponent
} from './core/components/icon-button/icon.component';
import { LogoComponent } from './core/components/logo/logo.component';
import { MapComponent } from './core/components/map/map.component';
import { MapControlComponent } from './core/components/map/map-control.component';
import { NavbarComponent } from './core/components/nav/navbar.component';
import { MobileMenuComponent } from './core/components/nav/mobile-menu/mobile-menu.component';
import { MobileMenuItemDirective } from './core/components/nav/mobile-menu/mobile-menu-item.directive';
import { MobileMenuTriggerComponent } from './core/components/nav/mobile-menu/mobile-menu-trigger.component';
import { PagerComponent } from './core/components/gallery/pager/pager.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ProjectComponent } from './project/project.component';
import { ScrollToComponent } from './core/components/scroll/scroll-to.component';
import { SplashComponent } from './core/components/splash/splash.component';
import { SplashContentComponent } from './core/components/splash/splash-content.component';
import { SocialModule } from './core/components/social/social.module';
import { StaffModalComponent } from './staff/staff-modal.component';
import { SubscribeComponent } from './core/forms/subscribe/subscribe.component';
import { TextareaAutoexpandDirective } from './core/forms/textarea-autoexpand.directive';
import { ImageZoomDirective } from './core/components/image-zoom/image-zoom.directive';
import { ImageZoomerComponent } from './core/components/image-zoom/image-zoomer.component';
import { ImageZoomLensComponent } from './core/components/image-zoom/zoom-lens/lens/zoom-lens.component';
import { ImageZoomLensCanvasComponent } from './core/components/image-zoom/zoom-lens/canvas/zoom-lens-canvas.component';
import { ImageZoomLensContainerComponent } from './core/components/image-zoom/zoom-lens/container/zoom-lens-container.component';

import { CapitalizePipe } from './core/pipes/capitalize.pipe';
import { TrimmedPipe } from './core/pipes/trimmed.pipe';

export const APP_PIPES = [CapitalizePipe, TrimmedPipe];

import { BlogService } from './blog/blog.service';
import { CacheService } from './core/services/cache.service';
import { CaptchaService } from './core/forms/captcha.service';
import { ClientService } from './client/client.service';
import { ConfigService } from './core/config/config.service';
import { DivisionService } from './division/division.service';
import { GeolocateService } from './core/components/map/geolocate.service';
import { JpImageZoomer } from './core/components/image-zoom/image-zoomer';
import { Logger } from './core/services/logger.service';
import { MobileMenuService } from './core/components/nav/mobile-menu/mobile-menu.service';
import { NavbarService } from './core/components/nav/navbar.service';
import { ScrollService } from './core/components/scroll/scroll.service';
import { StaffService } from './staff/staff.service';
import { FormSubmissionService } from './core/forms/contact-form/form-submission.service';
import { ProjectService } from './project/project.service';
import { ApiHttp } from './core/services/xhr.http';
import { TitleService } from './core/services/title.service';
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
  JpImageZoomer,
  Logger,
  MobileMenuService,
  NavbarService,
  ProjectService,
  StaffService,
  ScrollService,
  TitleService,
  XhrService
];

import { BlogGuard } from './blog/blog.guard';
import { BlogsGuard } from './blog/blogs.guard';
import { ConfigGuard } from './core/config/config.guard';
import { DivisionGuard } from './division/division.guard';
import { ProjectGuard } from './project/project.guard';

export const APP_MIDDLEWARE = [
  BlogGuard,
  BlogsGuard,
  ProjectGuard,
  ConfigGuard,
  DivisionGuard
];

const GOOGLE_API_KEY = '<%= CFG.GoogleMapsAPIKey %>';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: GOOGLE_API_KEY
    }),
    MatCommonModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatTooltipModule,
    MatRippleModule,
    MatProgressBarModule,
    MomentModule,
    Ng2PageScrollModule.forRoot(),
    ReCaptchaModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    SocialModule,
    InlineSVGModule
  ],
  declarations: [
    APP_PIPES,
    BackgroundDirective,
    BalloonComponent,
    BalloonCalloutComponent,
    BalloonCalloutIconComponent,
    BalloonTextComponent,
    BlogComponent,
    BlogsComponent,
    CardComponent,
    ContactFormComponent,
    ContentOverlayComponent,
    DisqusComponent,
    DynamicsDirective,
    FooterComponent,
    GalleryComponent,
    GalleryItemDirective,
    IconButtonComponent,
    IconButtonTextComponent,
    JpIconComponent,
    JpIconHoverComponent,
    JpUnderlineComponent,
    LogoComponent,
    MapComponent,
    MapControlComponent,
    MobileMenuComponent,
    MobileMenuItemDirective,
    MobileMenuTriggerComponent,
    NavbarComponent,
    PagerComponent,
    PrivacyComponent,
    ProjectComponent,
    ScrollToComponent,
    SplashComponent,
    SplashContentComponent,
    SubscribeComponent,
    StaffModalComponent,
    TextareaAutoexpandDirective,
    ImageZoomDirective,
    ImageZoomerComponent,
    ImageZoomLensComponent,
    ImageZoomLensCanvasComponent,
    ImageZoomLensContainerComponent
  ],
  exports: [
    APP_PIPES,
    BackgroundDirective,
    BalloonComponent,
    BalloonCalloutComponent,
    BalloonCalloutIconComponent,
    BalloonTextComponent,
    BlogComponent,
    BlogsComponent,
    CardComponent,
    ContactFormComponent,
    ContentOverlayComponent,
    DisqusComponent,
    DynamicsDirective,
    FooterComponent,
    GalleryComponent,
    GalleryItemDirective,
    IconButtonComponent,
    IconButtonTextComponent,
    JpIconComponent,
    JpIconHoverComponent,
    JpUnderlineComponent,
    LogoComponent,
    MapComponent,
    MapControlComponent,
    MobileMenuComponent,
    MobileMenuItemDirective,
    MobileMenuTriggerComponent,
    NavbarComponent,
    PagerComponent,
    PrivacyComponent,
    ProjectComponent,
    ScrollToComponent,
    SplashComponent,
    SplashContentComponent,
    SubscribeComponent,
    StaffModalComponent,
    TextareaAutoexpandDirective,

    ImageZoomDirective,
    ImageZoomerComponent,
    ImageZoomLensComponent,
    ImageZoomLensCanvasComponent,
    ImageZoomLensContainerComponent,

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AgmCoreModule,
    MatCommonModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatTooltipModule,
    MatRippleModule,
    MomentModule,
    Ng2PageScrollModule,
    ReCaptchaModule,
    ModalModule,
    BootstrapModalModule,
    InlineSVGModule,
    SocialModule
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
        WindowProviders,
        GoogleMapsAPIWrapper
        //MdIconRegistry,
        //OVERLAY_PROVIDERS,
        //PageScrollService,
        //{ provide: OverlayRenderer, useClass: DOMOverlayRenderer }
      ]
    };
  }
}
