import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Config } from '../core/config/env.config';
import { ApiHttp } from '../core/services/xhr.http';
import { XhrService } from '../core/services/xhr.service';

import { Project, ProjectsHttpResponse } from './project';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProjectService {

	constructor(public http: ApiHttp, public xhr: XhrService) { }

	public recent(skip = 0, take = 3, division?: string): Observable<ProjectsHttpResponse> {
		const params = new HttpParams();

		params.set('skip', skip.toString());
		params.set('take', take.toString());

		if (division) params.set('division', division.toString());

    return this.http.get<ProjectsHttpResponse>(Config.API + '/projects/recent', params);
	}

	public find(uri: string) {
		return this.http.get<Project>(Config.API + '/projects/uri/' + uri)
	}
}
