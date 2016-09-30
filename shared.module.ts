import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule, MdIconRegistry, OVERLAY_PROVIDERS } from '@angular/material';
import { MomentModule } from 'angular2-moment';
import {AgmCoreModule, GoogleMapsAPIWrapper} from 'angular2-google-maps/core';

import {
  BackgroundDirective,
  BalloonComponent,
  BalloonTextComponent,
  BalloonCalloutComponent,
  BalloonCalloutIconComponent,
  CardComponent,
  ContentOverlayComponent,
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
    MomentModule
  ],
  declarations: [
    BackgroundDirective,
    CardComponent,
    ContentOverlayComponent,
    BalloonComponent,
    BalloonCalloutIconComponent,
    BalloonTextComponent,
    BalloonCalloutComponent,
    ContentOverlayComponent,
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
    SocialIconsComponent,
    TextareaAutoexpandDirective,
    LinkedInButtonComponent,
    TweetButtonComponent,
    GooglePlusButtonComponent,
    SocialShareComponent,
    MobileMenuComponent,
    MobileMenuTriggerComponent,
    CapitalizePipe,
    TrimmedPipe,
    ContactFormComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule,
    MomentModule,
    MaterialModule,
    BackgroundDirective,
    CardComponent,
    ContentOverlayComponent,
    BalloonComponent,
    BalloonCalloutIconComponent,
    BalloonTextComponent,
    BalloonCalloutComponent,
    ContentOverlayComponent,
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
    SocialIconsComponent,
    TextareaAutoexpandDirective,
    SocialShareComponent,
    LinkedInButtonComponent,
    GooglePlusButtonComponent,
    TweetButtonComponent,
    MobileMenuComponent,
    MobileMenuTriggerComponent,
    CapitalizePipe,
    TrimmedPipe,
    ContactFormComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [APP_SERVICES, GoogleMapsAPIWrapper, MdIconRegistry, OVERLAY_PROVIDERS]
    };
  }
}
