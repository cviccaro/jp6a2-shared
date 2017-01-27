import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule, MdIconRegistry, OVERLAY_PROVIDERS } from '@angular/material';
import { MomentModule } from 'angular2-moment';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core/services';

import { RecaptchaModule } from 'ng2-recaptcha/recaptcha/recaptcha.module';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';

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
  StaffModalComponent
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
    MaterialModule,
    MomentModule,
    RecaptchaModule.forRoot(),
    ModalModule.forRoot(),
    BootstrapModalModule,
    InlineSVGModule
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
    StaffModalComponent
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
    MaterialModule,
    RecaptchaModule,

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
    InlineSVGModule
  ],
  entryComponents: [
    StaffModalComponent
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
