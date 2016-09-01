import { Injectable } from '@angular/core';
import { ApiHttp } from '../xhr/xhr.http';
import { FormSubmission } from '../models/form-submission';
import { Config } from '../index';

@Injectable()
export class FormSubmissionService {
	constructor(public http: ApiHttp) { }

	submit(submission: FormSubmission) {
		let form = submission.createFormData();

		if (Config.division !== undefined) {
			form.append('division', Config.division);
		} else {
			form.append('division', 'main');
		}

		return this.http.post(Config.API + '/contact-form-submit', form)
			.map(res => res.json());
	}
}
