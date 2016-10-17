import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
    selector: '[jp-mobile-menu-item]'
})
export class MobileMenuItemDirective {
    @HostListener('click', ['$event'])
    onClick(e: Event) {
        this.clicked.emit(e);
    }
    @Output() public clicked = new EventEmitter();
}
