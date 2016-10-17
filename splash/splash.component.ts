import { Component, Input, OnInit, HostListener, HostBinding } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  moduleId: module.id,
  selector: 'jp-splash',
  templateUrl: './splash.component.html',
  styleUrls: [ './splash.component.css' ]
})
export class SplashComponent implements OnInit {
  public bgStyle: SafeStyle;
  public elHeight: string = '';

  @Input() splashUrl: string;
  @Input() fullscreen: boolean = false;
  @Input() align: string = 'center';
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
      let h = window.innerHeight > 558 ? window.innerHeight : 558;
      this.elHeight = h+'px';
    } else if (this.height !== undefined) {
      this.elHeight = this.height + 'px';
    }
  }

  ngOnInit() {
    this.bgStyle = this.sanitizer.bypassSecurityTrustStyle(`url('${this.splashUrl}')`);
    this.setHeight();
  }
}
