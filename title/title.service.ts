import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Config } from '../config/index';

@Injectable()
export class TitleService {
	constructor(public angularTitle: Title) {}

	setTitle(title: string) {
		this.angularTitle.setTitle(`${title} | ${Config.siteTitle}`);
	}
}
