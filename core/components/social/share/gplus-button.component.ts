import { Component, OnInit, OnChanges, ElementRef, Renderer, Input, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'jp-gplus-button',
  template: '',
  styles: [':host { display: block; height: 25px; width: 64px; overflow: hidden; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GooglePlusButtonComponent implements OnInit, OnChanges {
  @Input() url: string;
  @Input() text = 'Tweet';

  constructor(public el: ElementRef, public renderer: Renderer) { }

  ngOnInit() {
    this.loadWidget();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadWidget();
  }

  loadWidget() {
    if (this.el.nativeElement.children.length > 0) {
      return this.renderShareButton();
    }
    const cfg = this.renderer.createElement(this.el.nativeElement, 'script');
    cfg.innerHTML = '(function() { window.___gcfg = { lang: "en-US", parsetags: "explicit" } })()';

    const script = this.renderer.createElement(this.el.nativeElement, 'script');
    script.src = '//apis.google.com/js/platform.js';
    script.async = true;
    script.defer = true;

    this.renderer.listen(script, 'load', () => {
      this.renderShareButton().subscribe((res: any) => {
        //
      });
    });
  }

  renderShareButton() {
    return Observable.create((observer: any) => {
      const button = this.renderer.createElement(this.el.nativeElement, 'div');
      button.className = 'g-plusone';
      button.dataset.action = 'share';
      //button.dataset.href = 'http://www.google.com';

      const gapi = (window as any).gapi;
      gapi.plusone.go(this.el.nativeElement);

      observer.next('');
      observer.complete();
    });
  }
}
