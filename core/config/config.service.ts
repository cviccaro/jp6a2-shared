import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { Config } from './env.config';
import { SiteSettings } from './site-settings';

@Injectable()
export class ConfigService {
  constructor(public http: HttpClient) { }

  get(): Observable<SiteSettings> {
    return this.http.get(Config.API + '/settings')
      .map((value: any[]) => {
        return new SiteSettings(value);
      });
  }
}
