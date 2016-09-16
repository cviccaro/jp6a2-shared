import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MdCoreModule } from '@angular2-material/core';
import { MdButtonModule } from '@angular2-material/button';
import {MdGridListModule} from '@angular2-material/grid-list';
import { MdInputModule } from '@angular2-material/input';
import { MdIconModule, MdIconRegistry } from '@angular2-material/icon';
import { MdProgressBarModule } from '@angular2-material/progress-bar';
import { MdToolbarModule } from '@angular2-material/toolbar';
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
    MdCoreModule,
    MdGridListModule,
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
    BalloonComponent,
    BalloonCalloutIconComponent,
    BalloonTextComponent,
    BalloonCalloutComponent,
    ContentOverlayComponent,
    GalleryComponent,
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
    MdCoreModule,
    MdGridListModule,
    MdInputModule,
    MdIconModule,
    MdButtonModule,
    MdToolbarModule,
    MdProgressBarModule,
    BackgroundDirective,
    CardComponent,
    ContentOverlayComponent,
    BalloonComponent,
    BalloonCalloutIconComponent,
    BalloonTextComponent,
    BalloonCalloutComponent,
    ContentOverlayComponent,
    GalleryComponent,
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
      providers: [APP_SERVICES, GoogleMapsAPIWrapper, MdIconRegistry]
    };
  }
}
