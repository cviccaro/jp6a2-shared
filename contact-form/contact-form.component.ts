import {Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import {Response} from '@angular/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormSubmission, EmailValidator} from '../index';
import {FormSubmissionService} from './form-submission.service';
import {Observable, Observer, Subscription} from 'rxjs/Rx';

@Component({
	selector: 'jp-contact-form',
	moduleId: module.id,
	templateUrl: './contact-form.component.html',
	styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnDestroy {
	@Output() formSubmitSuccess = new EventEmitter();

	contactForm: FormGroup;
	model = new FormSubmission();
	sub: Subscription;

	constructor(builder: FormBuilder, public service: FormSubmissionService) {
		this.contactForm = builder.group({
			first_name: ['', Validators.required],
			last_name: ['', Validators.required],
			company: ['', Validators.required],
			email: ['', [Validators.required, EmailValidator.emailFormat]],
			phone: [''],
			contact_time: [''],
			comments: ['', Validators.required],
			captcha: ['', Validators.required]
		});
	}

	postToServer() {
		return Observable.create((observer: Observer<Response>) => {
			this.sub = this.service.submit(this.model)
				.subscribe(
					res => {
						this.reset();
						observer.next(res);
					},
					err => {
						this.reset();
						observer.error(err);
					});
		});
	}

	reset() {
		this.contactForm.reset();
	}

	_submit() {
		this.model = new FormSubmission(this.contactForm.value);

		this.formSubmitSuccess.emit(this.model);
	}

	resolved(captchaResponse: string) {
	     // console.log(`Resolved captcha with response ${captchaResponse}:`, {
	     // 	form: this.contactForm,
	     // 	value: this.contactForm.value
	     // });
	 }

	ngOnDestroy() {
		if (this.sub) this.sub.unsubscribe();
	}
}
