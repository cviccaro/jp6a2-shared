import { Component, Input, OnInit, HostListener, HostBinding, ViewChild } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { SplashContentComponent } from './splash-content.component';

@Component({
  moduleId: module.id,
  selector: 'jp-splash',
  templateUrl: './splash.component.html',
  styleUrls: [ './splash.component.css' ]
})
export class SplashComponent implements OnInit {
  public bgStyle: SafeStyle;
  public elHeight = '';

  @ViewChild(SplashContentComponent) public splashContentCmp: SplashContentComponent;

  @Input() splashUrl: string;
  @Input() fullscreen = false;
  @Input() align = 'center';
  @Input() height: number;

  @HostBinding('class.align-left') get leftClass() {
    return this.align === 'left';
  }
  @HostBinding('class.align-center') get centerClass() {
    return this.align === 'center';
  }
  @HostBinding('class.align-right') get rightClass() {
    return this.align === 'right';
  }

  @HostBinding('style.height') get heightStyle() {
    return this.elHeight;
  }

  @HostListener('window:resize')
  onResize() {
    if (this.fullscreen) this.setHeight();
  }

  constructor(public sanitizer: DomSanitizer) {
  }

  setHeight() {
    if (this.fullscreen) {
      const $nav: any = document.querySelector('jp-navbar');
      let navHeight = 0;
      if ($nav) {
        navHeight = $nav.offsetHeight;
      }
      const h = window.innerHeight > 558 ? window.innerHeight : 558;
      this.elHeight = `${h - navHeight}px`;
    } else if (this.height !== undefined) {
      this.elHeight = this.height + 'px';
    }
  }

  ngOnInit() {
    this.bgStyle = this.sanitizer.bypassSecurityTrustStyle(`url('${this.splashUrl}')`);
    this.setHeight();
  }
}
