import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { XhrService } from './xhr.service';

export interface ApiHttpRequestOptions {
    body?: any;
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: any;
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
}

export interface ApiHttpOptions {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: any;
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
};

@Injectable()
export class ApiHttp {
    working: any = {};
    index = 0;

    constructor(public http: HttpClient, public xhr: XhrService) { }

    request<T>(url: string, options: ApiHttpRequestOptions = {}): Observable<T> {
        const key = this.getNewIdentifier();

        this.xhr.startTracking(key);

        const method = 'GET';

        return Observable.create((observer: Observer<T>) => {
            this.http.request(method, url, options)
                .subscribe((res: T) => {
                    this.xhr.stopTracking(key);
                    observer.next(res);
                });
        });
    }

    get<T>(url: string, options: ApiHttpOptions = {}): Observable<T> {
        const key = this.getNewIdentifier();

        this.xhr.startTracking(key);

        return Observable.create((observer: Observer<T>) => {
            this.http.get(url, options)
                .subscribe((res: T) => {
                    this.xhr.stopTracking(key);
                    observer.next(res);
                });
        });
    }

    post<T>(url: string, body: any, options: ApiHttpOptions = {}): Observable<T> {
        const key = this.getNewIdentifier();

        this.xhr.startTracking(key);

        return Observable.create((observer: Observer<T>) => {
            this.http.post(url, body, options)
                .subscribe((res: T) => {
                    this.xhr.stopTracking(key);
                    observer.next(res);
                });
        });
    }

    put<T>(url: string, body: any, options: ApiHttpOptions = {}): Observable<T> {
        const key = this.getNewIdentifier();

        this.xhr.startTracking(key);

        return Observable.create((observer: Observer<T>) => {
            this.http.put(url, body, options)
                .subscribe((res: T) => {
                    this.xhr.stopTracking(key);
                    observer.next(res);
                });
        });
    }

    delete<T>(url: string, options: ApiHttpOptions = {}): Observable<T> {
        const key = this.getNewIdentifier();

        this.xhr.startTracking(key);

        return Observable.create((observer: Observer<T>) => {
            this.http.delete(url, options)
               .subscribe((res: T) => {
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
