import { Component } from '@angular/core';
import { CacheService } from '../cache/cache.service';

@Component({
  moduleId: module.id,
  selector: 'jp-logo',
  template: '<img [src]="logo.url" [alt]="logo.description" />'
})
export class LogoComponent {
  logo: { url: string, description: string };

  constructor(public cache: CacheService) {
    let config = this.cache.get('config');

    if (config['logo']) {
    	this.logo = this.cache.get('config').logo;
    } else if (config['main_site_logo']) {
    	this.logo = this.cache.get('config').main_site_logo;
    } else {
    	this.logo = {url: '/assets/images/logo.png', description: ''};
    }
  }
}
