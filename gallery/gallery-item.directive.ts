import { Directive, ElementRef } from '@angular/core';

@Directive({
	selector: '[jpGalleryItem]'
})
export class GalleryItemDirective {
	constructor(public el: ElementRef) { 
		console.log(this.el.nativeElement.hasAttribute('jp-background'));
	}
}
