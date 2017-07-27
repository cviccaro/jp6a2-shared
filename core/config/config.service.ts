import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { Config } from './env.config';
import { SiteSettings } from './site-settings';

@Injectable()
export class ConfigService {
  constructor(public http: Http) { }

  get(): Observable<SiteSettings> {
    return this.http.get(Config.API + '/settings')
      .map(res => {
        let json = res.json();
        return new SiteSettings(json);
      });
  }
}
