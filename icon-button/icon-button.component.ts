import { Component, Input, ElementRef, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
@Component({
	moduleId: module.id,
	selector: 'jp-icon-button',
	templateUrl: './icon-button.component.html',
	styleUrls: [ './icon-button.component.css' ],
})
export class IconButtonComponent implements OnInit {
	@Input() href: string = '#';
    @Input() svg: string = '';

    safeSvgBgImage: SafeStyle;

	constructor(public el: ElementRef, public sanitizer: DomSanitizer) { }

    ngOnInit() {
        if (this.svg) {
            this.safeSvgBgImage = this.sanitizer.bypassSecurityTrustStyle(`url('/assets/svg/${this.svg}.svg')`);
        }
        console.log('IconButtonComponent initialized', this);
    }
}
