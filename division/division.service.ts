import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import { Config } from '../config/env.config';
import { ApiHttp } from '../xhr/xhr.http';
import { Division } from '../models/division';

@Injectable()
export class DivisionService {
	constructor(public http: ApiHttp) { }

	get(id: any) {
		let params = new URLSearchParams();

		params.set('thin', '1');

		return this.http.get(`${Config.API}/divisions/${id}`, params)
			.map(res => new Division(res.json()));
	}
}
