import { CanActivate } from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { Http, Response, ResponseContentType } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { CacheService } from '../services/cache.service';
import { ConfigService } from './config.service';
import { SiteSettings } from './site-settings';

@Injectable()
export class ConfigGuard implements CanActivate, OnDestroy {
  imagePreloader: Subscription;
  sub: Subscription;

  constructor(public cache: CacheService, public service: ConfigService, public http: Http) { }

  canActivate(): boolean|Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      this.sub = this.service.get().subscribe((settings: SiteSettings)=> {
        if (settings.main_site_background) {
          this.imagePreloader = this.http.get(settings.main_site_background.url, { responseType: ResponseContentType.Blob })
            .subscribe((res: Response) => {
              settings.main_site_background.urlBlob = window.URL.createObjectURL(res.blob());
              this.cache.store('config', settings);
              observer.next(true);
              observer.complete();
            });
        } else {
          this.cache.store('config', settings);
          observer.next(true);
          observer.complete();
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.imagePreloader) this.imagePreloader.unsubscribe();
    if (this.sub) this.sub.unsubscribe();
  }
}
