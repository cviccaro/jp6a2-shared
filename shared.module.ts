import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MdCoreModule } from '@angular2-material/core';
import { MdButtonModule } from '@angular2-material/button';
import { MdInputModule } from '@angular2-material/input';
import { MdIconModule } from '@angular2-material/icon';
import { MdProgressBarModule } from '@angular2-material/progress-bar';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MomentModule } from 'angular2-moment';
import {AgmCoreModule, GOOGLE_MAPS_PROVIDERS, GoogleMapsAPIWrapper} from 'angular2-google-maps/core';

import {
  BackgroundDirective,
  CardComponent,
  ContentOverlayComponent,
  GalleryComponent,
  HoverDynamicsDirective,
  IconButtonComponent,
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
  ContactFormComponent
} from './index';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AgmCoreModule,
    MdCoreModule,
    MdInputModule,
    MdIconModule,
    MdButtonModule,
    MdToolbarModule,
    MdProgressBarModule,
    MomentModule
  ],
  declarations: [
    BackgroundDirective,
    CardComponent,
    ContentOverlayComponent,
    GalleryComponent,
    HoverDynamicsDirective,
    IconButtonComponent,
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
    ContactFormComponent
  ],
  exports: [
    BackgroundDirective,
    CardComponent,
    ContentOverlayComponent,
    GalleryComponent,
    HoverDynamicsDirective,
    IconButtonComponent,
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
    ContactFormComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [APP_SERVICES, GOOGLE_MAPS_PROVIDERS, GoogleMapsAPIWrapper]
    };
  }
}
