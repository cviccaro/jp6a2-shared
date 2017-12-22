import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml, SafeResourceUrl, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';

import { Blog } from './blog';
import { BlogService } from './blog.service';
import { CacheService } from '../core/services/cache.service';
import { TitleService } from '../core/services/title.service';
import { ScrollService } from '../core/components/scroll/scroll.service';
import { ContentOverlayComponent } from '../core/components/content-overlay/content-overlay.component';

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
	@ViewChild(ContentOverlayComponent) public contentOverlayCmp: ContentOverlayComponent;

	private subs: Subscription[] = [];

	constructor(
		public cache: CacheService,
		public blogService: BlogService,
		public route: ActivatedRoute,
		public sanitizer: DomSanitizer,
		public title: TitleService,
		public scroll: ScrollService
	) {
		this.subs.push(
			this.route.params.subscribe(params => {
				if (!this.first) {
					if (params.hasOwnProperty('slug')) {
						this.fetchBlog(params['slug']);
						this.scroll.scrollElementInline(this.contentOverlayCmp.el.nativeElement, this.titleEl.nativeElement);
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
			this.handleHttpResponse(this.cache.get('blog'), false);
			this.related = this.cache.get('blog_related');
		} else {
			this.fetchBlog(this.route.snapshot.params['slug']);
		}
	}

	fetchBlog(slug: string) {
		this.subs.push(
			this.blogService.find(slug)
				.subscribe(res => this.handleHttpResponse(res))
		);
	}

	handleHttpResponse(res: any, fetchRelated: any = true) {
		this.blog = res;
		this.blogBodySafe = this.trust(this.blog.body);
		this.shareUrl = this.buildUrl(this.blog.uri);
		this.ready = true;

		this.title.setTitle(`${this.blog.title} | Blogs`);

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
