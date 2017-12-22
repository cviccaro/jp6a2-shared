import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Config } from '../core/config/env.config';
import { ApiHttp } from '../core/services/xhr.http';
import { XhrService } from '../core/services/xhr.service';

@Injectable()
export class ProjectService {

	constructor(public http: ApiHttp, public xhr: XhrService) { }

	public recent(skip = 0, take = 3, division?: string) {
		const params = new HttpParams();

		params.set('skip', skip.toString());
		params.set('take', take.toString());

		if (division) params.set('division', division.toString());

    return this.http.get(Config.API + '/projects/recent', params)
    	.map((res: HttpResponse<any>) => res.json());
	}

	public find(uri: string) {
		return this.http.get(Config.API + '/projects/uri/' + uri)
			.map((res: HttpResponse<any>) => res.json());
	}
}
