import { HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../core/config/env.config';
import { ApiHttp } from '../core/services/xhr.http';
import { XhrService } from '../core/services/xhr.service';

@Injectable()
export class BlogService {
  constructor(public http: ApiHttp, public xhr: XhrService) { }

  all(skip: number = 0) {
    const params = new HttpParams();
    params.set('skip', skip.toString());

    return this.http.get(Config.API + '/blogs', params)
      .map((res: HttpResponse<any>) => res.json());
  }

  find(uri: string) {
    return this.http.get(Config.API + '/blogs/uri/' + uri)
      .map((res: HttpResponse<any>) => res.json());
  }

  related(id: number, max: number = 3) {
    const params = new HttpParams();
    params.set('max', max.toString());

    return this.http.get(Config.API + '/blogs/related/' + id, params)
      .map((res: HttpResponse<any>) => res.json());
  }

  recent(skip: number = 0, take: number = 3, filter?: string) {
    const params = new HttpParams();

    params.set('skip', skip.toString());
    params.set('take', take.toString());

    if (filter) {
      params.set('filter', filter);
    }

    return this.http.get(Config.API + '/blogs/recent', params)
      .map((res: HttpResponse<any>) => res.json());
  }
}
