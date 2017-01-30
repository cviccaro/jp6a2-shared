import { CanActivate } from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { CacheService } from '../cache/cache.service';
import { ConfigService } from './config.service';
import { Response } from '@angular/http';

@Injectable()
export class ConfigGuard implements CanActivate, OnDestroy {
  public sub: Subscription;

  constructor(public cache: CacheService, public service: ConfigService) { }

  canActivate(): boolean|Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      this.sub = this.service.get().subscribe((res: Response)=> {
        this.cache.store('config', res);
        observer.next(true);
        observer.complete();
      });
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
