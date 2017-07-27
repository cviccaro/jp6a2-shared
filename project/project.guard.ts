import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ProjectService } from './project.service';
import { CacheService } from '../core/services/cache.service';

@Injectable()
export class ProjectGuard implements CanActivate, OnDestroy {
  data: { [key: string] : any } = {
    blogs: null,
    clients: null,
    staff: null,
    projects: null
  };

  sub: Subscription;

  constructor(
    public cacheService: CacheService,
    public projectService: ProjectService
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    let segment: any = route.url[1];
    let slug: string = segment['path'];

    return Observable.create((observer: Observer<boolean>) => {
      this.sub = this.projectService.find(slug)
          .subscribe(
            (res: Response) => {
              this.cacheService.store('project', res);
              observer.next(true);
              observer.complete();
            },
            (err: Error) => {
              return Observable.of(false);
            }
          );
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
