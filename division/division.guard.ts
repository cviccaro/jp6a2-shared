import { CanActivate } from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { CacheService } from '../cache/cache.service';
import { DivisionService } from './division.service';
import { Response } from '@angular/http';
import { Config } from '../config/env.config';

@Injectable()
export class DivisionGuard implements CanActivate, OnDestroy {
  public sub: Subscription;

  constructor(public cache: CacheService, public service: DivisionService) { }

  canActivate(): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      this.sub = this.service.get(Config.division).subscribe((res: Response)=> {
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
