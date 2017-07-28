import { Component, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ReCaptchaComponent } from 'angular2-recaptcha/lib/captcha.component';

import { FormSubmissionService } from './form-submission.service';
import { ContactFormSubmission } from '../form-submissions';
import { EmailValidator } from '../../validators/email.validator';
import { Config } from '../../config/env.config';
import { TextareaAutoexpandDirective } from '../textarea-autoexpand.directive';
import { CaptchaService } from '../captcha.service';

@Component({
    selector: 'jp-contact-form',
    moduleId: module.id,
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnDestroy {
    @Output() formSubmitSuccess = new EventEmitter();

    contactForm: FormGroup;
    model = new ContactFormSubmission();
    siteKey: any = false;
    postingToServer: Subscription;
    validatingCaptcha: Subscription;

    @ViewChild(ReCaptchaComponent) public recaptchaCmp: ReCaptchaComponent;
    @ViewChild(TextareaAutoexpandDirective) public textareaDir: TextareaAutoexpandDirective;

    constructor(
        builder: FormBuilder,
        public service: FormSubmissionService,
        public captcha: CaptchaService
    ) {
        let group: any = {
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            company: [''],
            email: ['', [Validators.required, EmailValidator.emailFormat]],
            phone: [''],
            contact_time: [''],
            comments: ['']
        };

        if (Config.hasOwnProperty('GoogleRecaptchaAPIKey')) {
            this.siteKey = Config.GoogleRecaptchaAPIKey;
            group.captcha = ['', Validators.required];
        }

        this.contactForm = builder.group(group);
    }

    postToServer() {
        return Observable.create((observer: Observer<Response>) => {
            this.postingToServer = this.service.submit(this.model)
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
        if (this.textareaDir) {
            this.textareaDir.setEmpty();
        }
    }

    _submit() {
        this.model = new ContactFormSubmission(this.contactForm.value);

        this.formSubmitSuccess.emit(this.model);
    }

    handleCaptchaResponse(captchaResponse: string) {
        if (captchaResponse !== null) {
            this.validatingCaptcha = this.captcha.validate(captchaResponse)
                .subscribe(
                (resp: any) => { if (!resp.success) this.recaptchaCmp.reset(); }
                );
        }
    }

    ngOnDestroy() {
        if (this.postingToServer) this.postingToServer.unsubscribe();
        if (this.validatingCaptcha) this.validatingCaptcha.unsubscribe();
    }
}
