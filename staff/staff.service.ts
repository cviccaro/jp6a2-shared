import { Injectable } from '@angular/core';

import { Config } from '../core/config/env.config';
import { ApiHttp } from '../core/services/xhr.http';

import { Staff } from './staff';

@Injectable()
export class StaffService {
  constructor(public http: ApiHttp) { }

  public all() {
    return this.http.get<Staff[]>(Config.API + '/staff/active');
  }
}
