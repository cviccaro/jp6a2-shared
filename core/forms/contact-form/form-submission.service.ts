import { Injectable } from '@angular/core';
import { ApiHttp } from '../../services/xhr.http';
import { ContactFormSubmission } from '../form-submissions';
import { Config } from '../../config/env.config';

@Injectable()
export class FormSubmissionService {
	constructor(public http: ApiHttp) { }

	submit(submission: ContactFormSubmission) {
		const form = submission.createFormData();

		if (Config.division !== undefined) {
			form.append('division', Config.division);
		} else {
			form.append('division', 'main');
		}

		return this.http.post(Config.API + '/contact-form-submit', form);
	}
}
