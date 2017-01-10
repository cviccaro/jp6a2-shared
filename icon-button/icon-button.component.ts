import { Component, Input, ElementRef, OnInit, HostBinding } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
	moduleId: module.id,
	selector: 'jp-icon-button',
	templateUrl: './icon-button.component.html',
	styleUrls: [ './icon-button.component.css' ],
})
export class IconButtonComponent implements OnInit {
	@Input() href: string = '#';
    @Input() svg: string = '';

	constructor(public el: ElementRef, public sanitizer: DomSanitizer) { }

    @HostBinding('class.inline-svg') get willApplyInlineSVGClass() {
        return this.svg !== '';
    }

    ngOnInit() {
//        console.log('IconButtonComponent initialized', this);
    }
}
