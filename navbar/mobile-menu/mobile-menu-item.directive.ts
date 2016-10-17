import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
    selector: '[jpMobileMenuItem]'
})
export class MobileMenuItemDirective {
    @Output() public clicked = new EventEmitter();

    @HostListener('click', ['$event'])
    onClick(e: Event) {
        this.clicked.emit(e);
    }
}
