import { Injectable } from '@angular/core';

import { Config } from '../core/config/env.config';
import { ApiHttp } from '../core/services/xhr.http';

@Injectable()
export class StaffService {
	constructor(public http: ApiHttp) { }

	public all() {
        return this.http.get(Config.API + '/staff/active')
            .map((res) => res.json());
	}
}
