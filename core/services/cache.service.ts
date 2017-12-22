/* tslint:disable:no-empty */

import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {
    private _cache: { [key: string]: any } = {};

    constructor() { }

    public get cache() { return this._cache; }

    public get(name: string) { return this.has(name) ? this.cache[name] : null; }

    public store(name: string, data: any) {
        this._cache[name] = data;

        return this;
    }

    public has(name: string) {
        return this._cache.hasOwnProperty(name);
    }
}
