import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BlogService } from './blog.service';
import { CacheService } from '../core/services/cache.service';

@Injectable()
export class BlogGuard implements CanActivate, OnDestroy {
  data: { [key: string]: any } = {
    blog: null,
    blog_related: null
  };

  subs: Subscription[];

  constructor(
    public blogService: BlogService,
    public cacheService: CacheService
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    const segment: any = route.url[1];
    const slug: string = segment['path'];

    return Observable.create((observer: Observer<boolean>) => {
      this.subs = [
        this.blogService.find(slug)
          .subscribe((res: any) => {
            this.data['blog'] = res;
            this.cacheService.store('blog', res);

            this.blogService.related(res.id)
              .subscribe(res => {
                this.data['related'] = res;
                this.cacheService.store('blog_related', res);
                observer.next(true);
                observer.complete();
              });
          })
      ];
    });
  }

  ngOnDestroy() {
    this.subs.forEach(sub => {
      if (sub) sub.unsubscribe();
    });
  }
}
