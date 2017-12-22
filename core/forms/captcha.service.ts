import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Config } from '../config/env.config';

@Injectable()
export class CaptchaService {
    constructor(public http: HttpClient) { }

    validate(captchaHttpResponse: string): Observable<any> {
        const url = `${Config.API}/recaptcha/validate`;
        const body = JSON.stringify({
            response: captchaHttpResponse
        });

        return this.http.post(url, body, { headers: new HttpHeaders({'Content-Type': 'application/json'})})
            .map((res: any) => {
                return res.json();
            })
            .catch((err: any) => {
                return err;
            });
    }
}
