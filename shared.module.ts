import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule, MdIconRegistry, OVERLAY_PROVIDERS } from '@angular/material';
import { MomentModule } from 'angular2-moment';
import { AgmCoreModule, GoogleMapsAPIWrapper } from 'angular2-google-maps/core';

import { RecaptchaModule } from 'ng2-recaptcha';

import {
  APP_PIPES,
  APP_SERVICES,
  BackgroundDirective,
  BALLOON_COMPONENTS,
  CardComponent,
  ContentOverlayComponent,
  FooterComponent,
  FORM_COMPONENTS,
  GALLERY_COMPONENTS,
  HoverDynamicsDirective,
  ICON_BUTTON_COMPONENTS,
  LogoComponent,
  MAP_COMPONENTS,
  NAV_COMPONENTS,
  SplashComponent,
  SOCIAL_COMPONENTS
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
    RecaptchaModule.forRoot()
  ],
  declarations: [
    APP_PIPES,
    BackgroundDirective,
    BALLOON_COMPONENTS,
    CardComponent,
    ContentOverlayComponent,
    FooterComponent,
    FORM_COMPONENTS,
    GALLERY_COMPONENTS,
    HoverDynamicsDirective,
    ICON_BUTTON_COMPONENTS,
    LogoComponent,
    MAP_COMPONENTS,
    NAV_COMPONENTS,
    SOCIAL_COMPONENTS,
    SplashComponent
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
    CardComponent,
    ContentOverlayComponent,
    FooterComponent,
    FORM_COMPONENTS,
    GALLERY_COMPONENTS,
    HoverDynamicsDirective,
    ICON_BUTTON_COMPONENTS,
    LogoComponent,
    MAP_COMPONENTS,
    NAV_COMPONENTS,
    SplashComponent,
    SOCIAL_COMPONENTS
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        APP_SERVICES,
        GoogleMapsAPIWrapper,
        MdIconRegistry,
        OVERLAY_PROVIDERS
      ]
    };
  }
}
