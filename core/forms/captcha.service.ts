import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Config } from '../config/env.config';

@Injectable()
export class CaptchaService {
    constructor(public http: HttpClient) { }

    validate(captchaHttpResponse: string): Observable<any> {
        const url = `${Config.API}/recaptcha/validate`;
        const params = {
        	'response': captchaHttpResponse
        };

        return this.http.post(url, { response: captchaHttpResponse });
    }
}
