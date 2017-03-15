import { Injectable, ViewContainerRef, ComponentRef, EventEmitter, ComponentFactoryResolver, Output, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { Logger } from '../logger/logger.service';
import { ImageZoomerComponent } from './image-zoomer.component';
import { ImageZoomDirective } from './image-zoom.directive';

@Injectable()
export class JpImageZoomer implements OnDestroy {
	public defaultViewContainer: ViewContainerRef;
	private zoomerRef: ComponentRef<any>;
	private activeItem: ImageZoomDirective;
	private _closeEmitter: EventEmitter<any> = new EventEmitter<any>();

	@Output() get onClose(): Observable<any> { return this._closeEmitter.asObservable(); }

	constructor(private cr: ComponentFactoryResolver, private logger: Logger) { }

	open(directive: ImageZoomDirective) {
		this.activeItem = directive;

		return Observable.create((observer: Observer<any>) => {
			// Avoid z-index issues by moving menu to body.
			// @todo: avoid messing with DOM..
			//document.body.appendChild(component.element.nativeElement);

			let componentFactory = this.cr.resolveComponentFactory(ImageZoomerComponent);
			let cmpRef = this.defaultViewContainer.createComponent(componentFactory);

			// Store reference to component
			this.zoomerRef = cmpRef;

			let imageUrl = this.activeItem.el.nativeElement.getAttribute('src');

			(<ImageZoomerComponent>this.zoomerRef.instance).imageUrl = imageUrl;

			this.logger.log('Opening Image Zoomer with URL: ', imageUrl);

			// // Subscribe to focus trap's event
			// (<ImageZoomerComponent>this.zoomerRef.instance).onClickOutside.subscribe(e => {
			// 	this.close();
			// });

			// Append it to DOM
			this.defaultViewContainer.element.nativeElement.appendChild(cmpRef.location.nativeElement);

			// Resolve the FocusTrap
			observer.next(this.zoomerRef);
			observer.complete();
		});
	}

	close(directive?: ImageZoomDirective) {
		if (directive === this.activeItem) this.activeItem = null;
		this.zoomerRef.destroy();
	}

	ngOnDestroy() {
		if (typeof this.zoomerRef.instance.canDestroy === 'function') {
		  this.zoomerRef.instance.canDestroy().then ( () => this.zoomerRef.destroy() );
		} else {
		  this.zoomerRef.destroy();
		}
	}
}
