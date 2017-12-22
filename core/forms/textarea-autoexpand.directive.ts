import { Directive, ElementRef, HostListener, AfterViewInit } from '@angular/core';

const keyCodes = {
	ENTER: 13,
	BACKSPACE: 8,
	DELETE: 46
};

@Directive({
	selector: '[jpTextareaAutoexpand]'
})

export class TextareaAutoexpandDirective implements AfterViewInit {
	lineHeight: number;
	height: number;
	diff: number;
	empty = false;

	containerEl: HTMLElement;
	labelEl: HTMLElement;

	required = false;

	constructor(private el: ElementRef) { }

	ngAfterViewInit() {
		this.required = this.el.nativeElement.hasAttribute('required');
		this.labelEl = this.el.nativeElement.previousElementSibling.children[0];
		this.containerEl = this.el.nativeElement.parentElement;

		this.containerEl.classList.add('mat-input-container');
		this.el.nativeElement.classList.add('mat-input-element');
		this.el.nativeElement.style.height = '48px';
		this.el.nativeElement.style.overflow = 'visible';
	}

	@HostListener('focus', ['$event'])
	onFocus(e: Event) {
		this.containerEl.classList.add('mat-focused');
	}

	@HostListener('blur', ['$event'])
	onBlur(e: Event) {
		this.containerEl.classList.remove('mat-focused');
		if (this.getValue()) {
			this.containerEl.classList.add('ng-dirty');
		} else {
			this.containerEl.classList.remove('ng-dirty');
		}
		this.handleEmpty();
	}

	@HostListener('keydown', ['$event'])
	onkeydown(e: any) {
		if (e.keyCode === keyCodes.ENTER || e.keyCode === keyCodes.BACKSPACE || e.keyCode === keyCodes.DELETE) {
			// Get the line-height
			if (this.lineHeight === undefined) {
				if (this.el.nativeElement.currentStyle) {
					this.lineHeight = this.el.nativeElement.currentStyle['line-height'];
				} else if (window.getComputedStyle) {
					this.lineHeight = parseInt(document.defaultView.getComputedStyle(this.el.nativeElement).getPropertyValue('line-height'));
				}
			}
			// Get the height
			if (this.height === undefined) {
				this.height = this.el.nativeElement.offsetHeight;
			}
			// Calculate the difference
			if (this.diff === undefined) {
				this.diff = this.height - this.lineHeight;
			}

			let newLines = this.el.nativeElement.value.split(/[\r\n]+/g).length || 1;
			if (e.keyCode === 13) {	newLines++;	}

			let newHeight = ((this.lineHeight + (this.diff / 2)) * newLines) + 20;
			if (newHeight < 48) newHeight = 48;
			if (newHeight !== this.el.nativeElement.offsetHeight) {
				this.el.nativeElement.style.height = newHeight + 'px';
			}
		}
		this.handleEmpty();
	}

	getValue(): string {
		return this.el.nativeElement.value;
	}

	handleEmpty() {
		this.empty = !this.getValue().length;

		if (this.empty) {
			this.labelEl.classList.add('mat-empty');
		} else {
			this.labelEl.classList.remove('mat-empty');
		}

		if (this.required) {
			this.containerEl.classList.add('ng-invalid');
		} else {
			this.containerEl.classList.remove('ng-invalid');
		}
	}

	setEmpty() {
		this.empty = true;
		this.labelEl.classList.add('mat-empty');

		if (this.required) {
			this.containerEl.classList.add('ng-invalid');
		} else {
			this.containerEl.classList.remove('ng-invalid');
		}
	}
}
