import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Config } from '../core/config/env.config';
import { ApiHttp } from '../core/services/xhr.http';
import { XhrService } from '../core/services/xhr.service';

import { Project, ProjectsHttpResponse } from './project';


@Injectable()
export class ProjectService {

	constructor(public http: ApiHttp, public xhr: XhrService) { }

	public recent(skip = 0, take = 3, division?: string): Observable<ProjectsHttpResponse> {
		const params: {
        [param: string]: string | string[];
    } = {
			'skip': skip.toString(),
			'take': take.toString()
		};

		if (division) params['division'] = division.toString();

    return this.http.get<ProjectsHttpResponse>(Config.API + '/projects/recent', { params: params });
	}

	public find(uri: string) {
		return this.http.get<Project>(Config.API + '/projects/uri/' + uri);
	}
}
