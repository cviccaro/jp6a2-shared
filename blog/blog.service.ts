import { HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../core/config/env.config';
import { ApiHttp } from '../core/services/xhr.http';
import { XhrService } from '../core/services/xhr.service';
import { Blog, BlogsHttpResponse } from './blog';

@Injectable()
export class BlogService {
  constructor(public http: ApiHttp, public xhr: XhrService) { }

  all(skip: number = 0) {
    const params = new HttpParams();
    params.set('skip', skip.toString());

    const url = `${Config.API}/blogs`;

    return this.http.get<BlogsHttpResponse>(url, {params: params});
  }

  find(uri: string) {
    return this.http.get<Blog>(`${Config.API}/blogs/uri/${uri}`);
  }

  related(id: number, max: number = 3) {
    const url = `${Config.API}/blogs/related/${id}`;
    const params = {
      'max' : max.toString()
    };

    return this.http.get<Blog[]>(url, {params: params});
  }

  recent(skip: number = 0, take: number = 3, filter?: string) {
    const url = `${Config.API}/blogs/recent`;

    const params: {
        [param: string]: string | string[];
    } = {
      'skip': skip.toString(),
      'take': take.toString()
    };

    if (filter) params['filter'] = filter;

    return this.http.get<BlogsHttpResponse>(url, {params: params});
  }
}
