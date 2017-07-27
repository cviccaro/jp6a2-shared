import { Directive, Input, HostListener, ElementRef, AfterViewInit } from '@angular/core';
import { Config } from '../../config/env.config';

declare var dynamics: any;

@Directive({
	selector: '[jpDynamics]'
})
export class DynamicsDirective implements AfterViewInit {
	@Input() jpDynamicsAnimation = 'bounce';
	@Input() jpDynamicsMobile = false;

	private _elem: HTMLElement;
	private listening = true;

	constructor(private _el: ElementRef) {
		this._elem = _el.nativeElement;
		this.listening = window.innerWidth >= Config.desktopWidth;
	}

	ngAfterViewInit() {
		if (this.jpDynamicsMobile !== false) this.listening = true;
	}

	@HostListener('mouseenter')
	onMouseEnter() {
		if (this.listening) {
			dynamics.css(this._elem, {
				scale: 1
			});
			dynamics.animate(this._elem, {
				scale: 0.9
			}, { type: dynamics[this.jpDynamicsAnimation] });
		}
	}
}
