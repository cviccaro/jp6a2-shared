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
// import { ModalModule } from 'angular2-modal';
// import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
// import { InlineSVGModule } from 'ng-inline-svg';

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
    //ModalModule.forRoot(),
    //BootstrapModalModule,
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
    ImageZoomLensContainerComponent

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
    ReCaptchaModule
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
