import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';

import { Project } from './project';
import { ProjectService } from './project.service';
import { CacheService } from '../core/services/cache.service';
import { TitleService } from '../core/services/title.service';

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
		public title: TitleService
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
		this.title.setTitle(`Project | ${this.project.title}`);
	}

	trust(v: string): SafeHtml {
		return this.sanitizer.bypassSecurityTrustHtml(v);
	}

	ngOnDestroy() {
		if (this.sub) this.sub.unsubscribe();
	}
}
