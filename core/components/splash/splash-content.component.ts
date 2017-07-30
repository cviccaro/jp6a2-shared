import { Component, ElementRef } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'jp-splash-content',
  template: '<ng-content></ng-content>'
})
export class SplashContentComponent {
  constructor(public el: ElementRef) { }
}
