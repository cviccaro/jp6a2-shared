import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Config } from '../core/config/env.config';
import { ApiHttp } from '../core/services/xhr.http';

@Injectable()
export class ClientService {
	constructor(public http: ApiHttp) {}

	featured() {
		return this.http.get(Config.API + '/clients/featured');
	}
}
