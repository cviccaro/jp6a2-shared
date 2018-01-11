import { InjectionToken, Injectable } from '@angular/core';

@Injectable()
export class MockWindow {
  public DISQUS: {
    reset: (params: {}) => {}
  };
  public disqus_config: () => void;
}

export const WINDOW = new InjectionToken('window');
//export const windowFactory = () => (window) ? window : MockWindow;
export const WindowProviders = [
    { provide: WINDOW, useValue: MockWindow }
];
