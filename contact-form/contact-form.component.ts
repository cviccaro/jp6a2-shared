import { Component, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { Response} from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Observer, Subscription } from 'rxjs/Rx';
import { RecaptchaComponent } from 'ng2-recaptcha';

import { FormSubmissionService } from './form-submission.service';
import { FormSubmission, EmailValidator, Config } from '../index';
import { CaptchaService } from './captcha.service';

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
    siteKey: any = false;
    sub: Subscription;
    sub2: Subscription;

    @ViewChild('recaptcha') recaptchaEl: RecaptchaComponent;

    constructor(
        builder: FormBuilder,
        public service: FormSubmissionService,
        public captcha: CaptchaService
    ) {
        let group: any = {
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            company: ['', Validators.required],
            email: ['', [Validators.required, EmailValidator.emailFormat]],
            phone: [''],
            contact_time: [''],
            comments: ['', Validators.required]
        };

        if (Config.hasOwnProperty('GoogleRecaptchaAPIKey')) {
            this.siteKey = Config.GoogleRecaptchaAPIKey;
            group.captcha = ['', Validators.required];
        }

        this.contactForm = builder.group(group);
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
        this.sub2 = this.captcha.validate(captchaResponse)
            .subscribe(
	            (resp: any) => { if (!resp.success) this.recaptchaEl.reset(); },
	            (err: any) => this.recaptchaEl.reset()
            );
	}

    ngOnDestroy() {
        if (this.sub) this.sub.unsubscribe();
        if (this.sub2) this.sub2.unsubscribe();
    }
}
