import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { GooglePlusButtonComponent } from './share/gplus-button.component';
import { LinkedInButtonComponent } from './share/linkedin-button.component';
import { TweetButtonComponent } from './share/tweet-button.component';
import { SocialShareComponent } from './share/social-share.component';
import { SocialIconsComponent } from './icons/social-icons.component';

@NgModule({
  imports: [MatIconModule],
  declarations: [
  	GooglePlusButtonComponent,
  	LinkedInButtonComponent,
  	TweetButtonComponent,
  	SocialIconsComponent,
  	SocialShareComponent
	],
  exports: [
  	GooglePlusButtonComponent,
  	LinkedInButtonComponent,
  	TweetButtonComponent,
  	SocialIconsComponent,
  	SocialShareComponent,
  	MatIconModule
	]
})
export class SocialModule { }
