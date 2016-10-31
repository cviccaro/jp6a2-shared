import { Injectable, Component, Input, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { __platform_browser_private__ as _, DOCUMENT, Title } from '@angular/platform-browser';
import { WINDOW, MockWindow } from './window';

@Component({
  selector: 'disqus',
  template: '<div id="disqus_thread"></div>',
})

@Injectable()
export class Disqus implements OnInit {

  /**
   * The unique identifier for the page
   */
  @Input()
  public identifier: string;

  /**
   * Your Disqus shortname
   */
  @Input()
  public shortname: string;

  /**
   * Create new Disqus script
   * @param {any}        document
   * @param {MockWindow} window
   * @param {Location}   location
   */
  constructor(
    @Inject(DOCUMENT) private document: any,
    @Inject(WINDOW) private window: MockWindow,
    private location: Location,
    public title: Title
  ) {}

  /**
   * Component on init
   */
  ngOnInit() {
    if (this.window.DISQUS === undefined) {
      this.addScriptTag();
    } else {
      this.reset();
    }
  }

  /**
   * Get Disqus config
   * @return {Function}
   */
  public getConfig(): () => void {
    let _self = this;

    return function () {
      console.log('Starting Disqus Load');
      this.page.url = window.location.protocol + '//' + window.location.host + _self.location.path();
      this.page.identifier = _self.identifier;
      this.language = this.page.language = 'en';

      this.page.title = _self.title.getTitle();

      console.log('Disqus Loaded: ', this);
    };
  }

  /**
   * Reset Disqus with new information.
   */
  private reset() {
    this.window.DISQUS.reset({
      reload: true,
      config: this.getConfig()
    });
  }

  /**
   * Add the Disqus script to the document.
   */
  private addScriptTag() {
    this.window.disqus_config = this.getConfig();
    let container = this.getScriptContainer();
    let script = this.buildScriptTag(`//${this.shortname}.disqus.com/embed.js`);
    _.getDOM().insertBefore(container.lastChild, script);
  }

  /**
   * Get the HEAD element
   * @return {HTMLHeadElement}
   */
  private getScriptContainer(): HTMLHeadElement {
    return this.document.head;
  }

  /**
   * Build the Disqus script element.
   * @param  {string} src
   * @return {HTMLElement}
   */
  private buildScriptTag(src: string): HTMLElement {
    let script = _.getDOM().createElement('script');
    _.getDOM().setAttribute(script, 'src', src);
    _.getDOM().setAttribute(script, 'async', 'true');
    _.getDOM().setAttribute(script, 'type', 'text/javascript');
    _.getDOM().setAttribute(script, 'data-timestamp', new Date().getTime().toString());
    return script;
  }
}