import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MdButtonModule } from '@angular/material/button';
import { MdIconModule, MdIconRegistry } from '@angular/material/icon';
import { MdGridListModule } from '@angular/material/grid-list';
import { MdInputModule } from '@angular/material/input';
import { MdToolbarModule } from '@angular/material/toolbar';
import { MdProgressBarModule } from '@angular/material/progress-bar';
import { MdRippleModule, OVERLAY_PROVIDERS } from '@angular/material/core';

import { MomentModule } from 'angular2-moment';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core/services';

import { RecaptchaModule } from 'ng2-recaptcha/recaptcha/recaptcha.module';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';

import { Ng2PageScrollModule } from 'ng2-page-scroll';

import {
  APP_MIDDLEWARE,
  APP_PIPES,
  APP_SERVICES,
  BackgroundDirective,
  BALLOON_COMPONENTS,
  BlogComponent,
  BlogsComponent,
  CardComponent,
  ContentOverlayComponent,
  DisqusComponent,
  FooterComponent,
  FORM_COMPONENTS,
  GALLERY_COMPONENTS,
  HoverDynamicsDirective,
  ICON_BUTTON_COMPONENTS,
  LogoComponent,
  MAP_COMPONENTS,
  NAV_COMPONENTS,
  PrivacyComponent,
  ProjectComponent,
  SplashComponent,
  SOCIAL_COMPONENTS,
  ScrollToComponent,
  SubscribeComponent,
  WindowProviders,
  StaffModalComponent,
  ImageZoomDirective,
  ImageZoomerComponent
} from './index';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule,
    MdButtonModule.forRoot(),
    MdIconModule.forRoot(),
    MdGridListModule.forRoot(),
    MdToolbarModule.forRoot(),
    MdRippleModule.forRoot(),
    MdInputModule.forRoot(),
    MdProgressBarModule.forRoot(),
    MomentModule,
    RecaptchaModule.forRoot(),
    ModalModule.forRoot(),
    BootstrapModalModule,
    InlineSVGModule,
    Ng2PageScrollModule.forRoot()
  ],
  declarations: [
    APP_PIPES,
    BackgroundDirective,
    BALLOON_COMPONENTS,
    BlogComponent,
    BlogsComponent,
    CardComponent,
    ContentOverlayComponent,
    DisqusComponent,
    FooterComponent,
    FORM_COMPONENTS,
    GALLERY_COMPONENTS,
    HoverDynamicsDirective,
    ICON_BUTTON_COMPONENTS,
    LogoComponent,
    MAP_COMPONENTS,
    NAV_COMPONENTS,
    PrivacyComponent,
    ProjectComponent,
    ScrollToComponent,
    SOCIAL_COMPONENTS,
    SplashComponent,
    SubscribeComponent,
    StaffModalComponent,
    ImageZoomDirective,
    ImageZoomerComponent
  ],
  exports: [
    // Angular modules
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    // Third party modules
    AgmCoreModule,
    MomentModule,
    MdButtonModule,
    MdIconModule,
    MdGridListModule,
    MdToolbarModule,
    MdRippleModule,
    MdInputModule,
    MdProgressBarModule,
    RecaptchaModule,
    Ng2PageScrollModule,

    // App modules/components
    APP_PIPES,
    BackgroundDirective,
    BALLOON_COMPONENTS,
    BlogComponent,
    BlogsComponent,
    CardComponent,
    ContentOverlayComponent,
    DisqusComponent,
    FooterComponent,
    FORM_COMPONENTS,
    GALLERY_COMPONENTS,
    HoverDynamicsDirective,
    ICON_BUTTON_COMPONENTS,
    LogoComponent,
    MAP_COMPONENTS,
    NAV_COMPONENTS,
    PrivacyComponent,
    ProjectComponent,
    ScrollToComponent,
    SplashComponent,
    SOCIAL_COMPONENTS,
    SubscribeComponent,
    StaffModalComponent,
    InlineSVGModule,
    ImageZoomDirective,
    ImageZoomerComponent
  ],
  entryComponents: [
    StaffModalComponent,
    ImageZoomerComponent
  ]
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
