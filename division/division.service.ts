import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { Config } from '../core/config/env.config';
import { ApiHttp } from '../core/services/xhr.http';
import { Division } from './division';

@Injectable()
export class DivisionService {
  constructor(public http: ApiHttp) { }

  get(id: any) {
    const params = new HttpParams();

    params.set('thin', '1');

    return this.http.get(`${Config.API}/divisions/${id}`, params)
      .map(res => new Division(res.json()));
  }
}
