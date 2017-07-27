import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { BlogService } from './blog.service';
import { CacheService } from '../core/services/cache.service';
import { Config } from '../core/config/env.config';

@Injectable()
export class BlogsGuard implements CanActivate, OnDestroy {
  sub: Subscription;

  constructor(
    public blogService: BlogService,
    public cache: CacheService
  ) { }

  canActivate() {
    return Observable.create((observer: Observer<boolean>) => {
      if (Config['division'] !== undefined) {
        this.sub = this.blogService.recent(0, 12, Config.division)
          .subscribe((res: Response) => {
            this.handleResponse(res, observer);
          });
      } else {
        this.sub = this.blogService.recent(0, 12)
          .subscribe((res: Response) => {
            this.handleResponse(res, observer);
          });
      }
    });
  }

  handleResponse(res: Response, observer: Observer<boolean>) {
    this.cache.store('blogs_page', res);
    observer.next(true);
    observer.complete();
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
