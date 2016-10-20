import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule, MdIconRegistry, OVERLAY_PROVIDERS } from '@angular/material';
import { MomentModule } from 'angular2-moment';
import { AgmCoreModule, GoogleMapsAPIWrapper } from 'angular2-google-maps/core';

import { RecaptchaModule } from 'ng2-recaptcha';

import {
  BackgroundDirective,
  BalloonComponent,
  BalloonTextComponent,
  BalloonCalloutComponent,
  BalloonCalloutIconComponent,
  CardComponent,
  ContentOverlayComponent,
  FooterComponent,
  GalleryComponent,
  GalleryItemDirective,
  HoverDynamicsDirective,
  IconButtonComponent,
  IconButtonTextComponent,
  JpIconComponent,
  JpIconHoverComponent,
  JpUnderlineComponent,
  LogoComponent,
  MapComponent,
  MapControlComponent,
  NavbarComponent,
  PagerComponent,
  PostComponent,
  SplashComponent,
  TextareaAutoexpandDirective,
  TweetButtonComponent,
  SocialIconsComponent,
  SocialShareComponent,
  LinkedInButtonComponent,
  GooglePlusButtonComponent,
  MobileMenuComponent,
  MobileMenuItemDirective,
  MobileMenuTriggerComponent,
  APP_SERVICES,
  CapitalizePipe,
  TrimmedPipe,
  ContactFormComponent
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
    BackgroundDirective,
    BalloonComponent,
    BalloonCalloutIconComponent,
    BalloonTextComponent,
    BalloonCalloutComponent,
    CapitalizePipe,
    CardComponent,
    ContentOverlayComponent,
    ContactFormComponent,
    FooterComponent,
    GalleryComponent,
    GalleryItemDirective,
    GooglePlusButtonComponent,
    HoverDynamicsDirective,
    IconButtonComponent,
    IconButtonTextComponent,
    JpIconComponent,
    JpIconHoverComponent,
    JpUnderlineComponent,
    LinkedInButtonComponent,
    LogoComponent,
    MapComponent,
    MapControlComponent,
    MobileMenuComponent,
    MobileMenuItemDirective,
    MobileMenuTriggerComponent,
    NavbarComponent,
    PagerComponent,
    PostComponent,
    SplashComponent,
    SocialIconsComponent,
    SocialShareComponent,
    TextareaAutoexpandDirective,
    TweetButtonComponent,
    TrimmedPipe
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule,
    MomentModule,
    MaterialModule,
    RecaptchaModule,
    BackgroundDirective,
    BalloonComponent,
    BalloonCalloutIconComponent,
    BalloonTextComponent,
    BalloonCalloutComponent,
    CapitalizePipe,
    CardComponent,
    ContentOverlayComponent,
    ContactFormComponent,
    FooterComponent,
    GalleryComponent,
    GalleryItemDirective,
    GooglePlusButtonComponent,
    HoverDynamicsDirective,
    IconButtonComponent,
    IconButtonTextComponent,
    JpIconComponent,
    JpIconHoverComponent,
    JpUnderlineComponent,
    LinkedInButtonComponent,
    LogoComponent,
    MapComponent,
    MapControlComponent,
    MobileMenuComponent,
    MobileMenuItemDirective,
    MobileMenuTriggerComponent,
    NavbarComponent,
    PagerComponent,
    PostComponent,
    SplashComponent,
    SocialIconsComponent,
    SocialShareComponent,
    TextareaAutoexpandDirective,
    TweetButtonComponent,
    TrimmedPipe
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
