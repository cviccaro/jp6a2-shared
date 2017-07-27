import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Config } from '../core/config/env.config';
import { ApiHttp } from '../core/services/xhr.http';
import { XhrService } from '../core/services/xhr.service';

@Injectable()
export class BlogService {
	constructor(public http: ApiHttp, public xhr: XhrService) { }

	all(skip:number = 0) {
		let params = new URLSearchParams();
		params.set('skip', skip.toString());

    return this.http.get(Config.API + '/blogs', {search: params})
        .map(res => res.json());
	}

	find(uri: string) {
		return this.http.get(Config.API + '/blogs/uri/' + uri)
			.map(res => res.json());
	}

	related(id: number, max: number = 3) {
		let params = new URLSearchParams();
		params.set('max', max.toString());

		return this.http.get(Config.API + '/blogs/related/' + id, { search: params })
			.map(res => res.json());
	}

	recent(skip: number = 0, take:number = 3, filter?: string) {
		let params = new URLSearchParams();

		params.set('skip', skip.toString());
		params.set('take', take.toString());

		if (filter) {
			params.set('filter', filter);
		}

		return this.http.get(Config.API + '/blogs/recent', { search: params })
			.map(res => res.json());
	}
}
