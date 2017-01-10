import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Rx';

import { BlogService } from '../blog/blog.service';
import { CacheService } from '../cache/cache.service';
import { Config } from '../config/index';


@Component({
	moduleId: module.id,
	selector: 'jp-blogs',
	templateUrl: './blogs.component.html',
	styleUrls: [ './blogs.component.css' ]
})
export class BlogsComponent implements OnInit, OnDestroy {
	blogs: any;
	config: any;
	perPage = 12;
	index = 0;
	fetchedBlogs: Subscription;
	finished = false;
	filter: string = null;

	constructor(public blogService: BlogService, public cache: CacheService, public title: Title) { }

	ngOnInit() {
		this.config = this.cache.get('config');

		this.blogs = this.cache.get('blogs_page');

		if (Config['division'] !== undefined) {
			this.filter = Config.division;
		}

		let title = 'JP Enterprises';

		if (this.config['main_site_title'] !== undefined) {
			title = this.config['main_site_title'];
		} else if (this.config['site_title'] !== undefined) {
			title = this.config['site_title'];
		}

		this.title.setTitle(`${title} | Blogs`);
	}

	getBlogs() {
		this.fetchedBlogs =
			this.fetchBlogs()
				.subscribe(res => {
					this.blogs = res;
					this.cache.store('blogs', res);
//					console.log('Blogs: ', this.blogs);
					this.finished = !(res.remaining > 0);
				});
	}

	filterData(filter: string, e: Event) {
		this.filter = filter;
		this.index = 0;
		this.finished = false;
		this.getBlogs();
		return false;
	}

	more() {
		this.index += this.perPage;

		this.fetchedBlogs =
			this.fetchBlogs(this.index)
				.subscribe(res => {
					this.blogs.blogs = this.blogs.blogs.concat(res.blogs);
					this.finished = !(res.remaining > 0);
				});

		return false;
	}

	/**
	 * Angular lifecycle 
	 */
	ngOnDestroy() {
		if (this.fetchedBlogs) this.fetchedBlogs.unsubscribe();
	}

	/**
	 * Fetch blogs
	 * @param {number = 0} skip [description]
	 */
	private fetchBlogs(skip: number = 0) {
		return this.blogService.recent(skip, this.perPage, this.filter);
	}
}
