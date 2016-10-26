import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Rx';

import { Project } from '../models/index';
import { ProjectService } from './project.service';
import { CacheService } from '../cache/index';

@Component({
	moduleId: module.id,
	selector: 'jp-project',
	templateUrl: './project.component.html',
	styleUrls: [ './project.component.css' ]
})
export class ProjectComponent implements OnInit, OnDestroy {
	config: any;
	ready = false;
	project: Project;

	private sub: Subscription;

	constructor(
		public cache: CacheService,
		public service: ProjectService,
		public route: ActivatedRoute,
		public sanitizer: DomSanitizer,
		public title: Title
	) {
		this.config = this.cache.get('config');
	}

	ngOnInit() {
		if (this.cache.has('project')) {
			this.project = this.cache.get('project');
			this.fetchComplete();
		} else {
			const slug = this.route.snapshot.params['slug'];

			this.sub = this.service.find(slug)
				.subscribe(res => {
					this.project = res;
					this.fetchComplete();
				});
		}
	}

	fetchComplete() {
		this.ready = true;

		let title = 'JP Enterprises';

		if (this.config['main_site_title'] !== undefined) {
			title = this.config['main_site_title'];
		} else if (this.config['site_title'] !== undefined) {
			title = this.config['site_title'];
		}

		this.title.setTitle(`${title} | Project | ${this.project.title}`);
	}

	trust(v: string): SafeHtml {
		return this.sanitizer.bypassSecurityTrustHtml(v);
	}

	ngOnDestroy() {
		if (this.sub) this.sub.unsubscribe();
	}
}
