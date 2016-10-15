import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Config } from '../index';

@Injectable()
export class CaptchaService {
    constructor(public http: Http) { }

    validate(captchaResponse: string): Observable<any> {
        let url = `${Config.API}/recaptcha/validate`;
        const body = JSON.stringify({
            response: captchaResponse
        });
        let headers = new Headers({'Content-Type': 'application/json'});

        return this.http.post(url, body, { headers: headers})
            .map((res: any) => {
                return res.json();
            })
            .catch((err: any) => {
                return err;
            });
    }
}
