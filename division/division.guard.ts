import { CanActivate } from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpResponse, HttpResponseContentType } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { CacheService } from '../core/services/cache.service';
import { Config } from '../core/config/env.config';
import { DivisionService } from './division.service';
import { Division } from './division';

@Injectable()
export class DivisionGuard implements CanActivate, OnDestroy {
  imagePreloader: Subscription;
  sub: Subscription;

  constructor(public cache: CacheService, public service: DivisionService, private http: HttpClient) { }

  canActivate(): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      this.sub = this.service.get(Config.division).subscribe((division: Division) => {
        if (division.image) {
          this.imagePreloader = this.http.get(division.image.url, { responseType: HttpResponseContentType.Blob })
            .subscribe((res: HttpResponse) => {
              division.image.urlBlob = window.URL.createObjectURL(res.blob());
              this.cache.store('config', division);
              observer.next(true);
              observer.complete();
            });
        } else {
          this.cache.store('config', division);

          observer.next(true);
          observer.complete();
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
