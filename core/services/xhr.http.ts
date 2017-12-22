import { Injectable } from '@angular/core';
import { HttpClient, , HttpResponse, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { XhrService } from './xhr.service';

@Injectable()
export class ApiHttp {
    working: any = {};
    index = 0;

    constructor(public http: HttpClient, public xhr: XhrService) { }

    request(url: string, options?: HttpParams): Observable<HttpResponse<any>> {
        const key = this.getNewIdentifier();

        this.xhr.startTracking(key);

        return Observable.create((observer: Observer<any>) => {
            this.http.request(url, options)
                .subscribe((res: HttpResponse<any>) => {
                    this.xhr.stopTracking(key);
                    observer.next(res);
                });
        });
    }

    get(url: string, options?: HttpParams): Observable<HttpResponse<any>> {
        const key = this.getNewIdentifier();

        this.xhr.startTracking(key);

        return Observable.create((observer: Observer<any>) => {
            this.http.get(url, options)
                .subscribe((res: HttpResponse<any>) => {
                    this.xhr.stopTracking(key);
                    observer.next(res);
                });
        });
    }

    post(url: string, body: any, options?: HttpParams): Observable<HttpResponse<any>> {
        const key = this.getNewIdentifier();

        this.xhr.startTracking(key);

        return Observable.create((observer: Observer<any>) => {
            this.http.post(url, body, options)
                .subscribe((res: HttpResponse<any>) => {
                    this.xhr.stopTracking(key);
                    observer.next(res);
                });
        });
    }

    put(url: string, body: any, options?: HttpParams): Observable<HttpResponse<any>> {
        const key = this.getNewIdentifier();

        this.xhr.startTracking(key);

        return Observable.create((observer: Observer<any>) => {
            this.http.put(url, body, options)
                .subscribe((res: HttpResponse<any>) => {
                    this.xhr.stopTracking(key);
                    observer.next(res);
                });
        });
    }

    delete(url: string, options?: HttpParams): Observable<HttpResponse<any>> {
        const key = this.getNewIdentifier();

        this.xhr.startTracking(key);

        return Observable.create((observer: Observer<any>) => {
            this.http.delete(url, options)
               .subscribe((res: HttpResponse<any>) => {
                   this.xhr.stopTracking(key);
                   observer.next(res);
               });
        });
    }

    /**
     * Private
     */
    private getNewIdentifier() {
        return 'request_' + this.index++;
    }
}
