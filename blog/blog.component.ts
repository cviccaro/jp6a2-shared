import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml, SafeResourceUrl, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Rx';

import { Blog } from '../models/index';
import { BlogService } from './blog.service';
import { CacheService } from '../cache/cache.service';

declare var jQuery: any;

@Component({
	moduleId: module.id,
	selector: 'jp-blog',
	templateUrl: './blog.component.html',
	styleUrls: [ './blog.component.css' ],
})
export class BlogComponent implements OnInit, OnDestroy {
	first = true;
	ready = false;
	blog: Blog;
	related: Blog[];
	blogBodySafe: SafeHtml;
	shareUrl: SafeResourceUrl;
	config: any;

	@ViewChild('title') public titleEl: ElementRef;

	private subs: Subscription[] = [];

	constructor(
		public cache: CacheService,
		public blogService: BlogService,
		public route: ActivatedRoute,
		public sanitizer: DomSanitizer,
		public title: Title
	) {
		this.subs.push(
			this.route.params.subscribe(params => {
				if (!this.first) {
					if (params.hasOwnProperty('slug')) {
						this.fetchBlog(params['slug']);
						setTimeout(() => {
							jQuery('jp-content-overlay').animate({scrollTop: this.titleEl.nativeElement.offsetTop});
						});
					}
				} else {
					this.first = false;
				}
			})
		);

		this.config = this.cache.get('config');
	}

	ngOnInit() {
		if (this.cache.has('blog') && this.cache.has('blog_related')) {
			this.handleResponse(this.cache.get('blog'), false);
			this.related = this.cache.get('blog_related');
		} else {
			this.fetchBlog(this.route.snapshot.params['slug']);
		}
	}

	fetchBlog(slug: string) {
		this.subs.push(
			this.blogService.find(slug)
				.subscribe(res => this.handleResponse(res))
		);
	}

	handleResponse(res: any, fetchRelated: any = true) {
		this.blog = res;
		this.blogBodySafe = this.trust(this.blog.body);
		this.shareUrl = this.buildUrl(this.blog.uri);
		this.ready = true;

		let title = 'JP Enterprises';

		if (this.config['main_site_title'] !== undefined) {
			title = this.config['main_site_title'];
		} else if (this.config['site_title'] !== undefined) {
			title = this.config['site_title'];
		}

		this.title.setTitle(`${title} | Blog | ${this.blog.title}`);

		if (fetchRelated) {
			this.subs.push(
				this.blogService.related(this.blog.id)
					.subscribe(res => {
						this.related = res;
					})
			);
		}
	}

	trust(v: string): SafeHtml {
		return this.sanitizer.bypassSecurityTrustHtml(v);
	}

	buildUrl(uri: string) {
		return `${window.location.protocol}//${window.location.hostname}/blogs/${uri}`;
	}

	ngOnDestroy() {
		this.subs.forEach(sub => {
			if (sub) sub.unsubscribe();
		});
	}
}
