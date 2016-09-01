import {Component, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormSubmission, EmailValidator} from '../index';

@Component({
	selector: 'jp-contact-form',
	moduleId: module.id,
	templateUrl: './contact-form.component.html',
	styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
	@Output() formSubmitSuccess = new EventEmitter();

	contactForm: FormGroup;
	model = new FormSubmission();

	constructor(builder: FormBuilder) {
		this.contactForm = builder.group({
			first_name: ['', Validators.required],
			last_name: ['', Validators.required],
			company: ['', Validators.required],
			email: ['', [Validators.required, EmailValidator.emailFormat]],
			phone: [''],
			contact_time: [''],
			comments: ['', Validators.required]
		});
	}

	submit() {
		this.model = this.contactForm.value;
		//console.log('submit form', this.model);
		this.formSubmitSuccess.emit(this.model);
	}
}
