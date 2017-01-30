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
	empty: boolean = false;

	constructor(private el: ElementRef) { }

	ngAfterViewInit() {
		this.el.nativeElement.style.height = '48px';
	}

	@HostListener('focus', ['$event'])
	onFocus(e: Event) {
		this.el.nativeElement.previousElementSibling.classList.add('md-focused');
	}

	@HostListener('blur', ['$event'])
	onBlur(e: Event) {
		this.el.nativeElement.previousElementSibling.classList.remove('md-focused');
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

			let newHeight = (this.lineHeight + (this.diff / 2)) * newLines;
			if (newHeight < 48) newHeight = 48;
			console.log('new height: ', newHeight, 'old height: ', this.el.nativeElement.offsetHeight);
			if (newHeight !== this.el.nativeElement.offsetHeight) {
				this.el.nativeElement.style.height = newHeight + 'px';
			}
		}
		this.handleEmpty();
	}

	handleEmpty() {
		this.empty = !this.el.nativeElement.value.length;

		if (this.empty) {
			this.el.nativeElement.previousElementSibling.classList.add('md-empty');
		} else {
			this.el.nativeElement.previousElementSibling.classList.remove('md-empty');
		}
	}

	setEmpty() {
		this.empty = true;
		this.el.nativeElement.previousElementSibling.classList.add('md-empty');
	}
}
