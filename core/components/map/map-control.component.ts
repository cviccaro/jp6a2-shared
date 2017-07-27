import { Component, Output, EventEmitter } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';

@Component({
  selector: 'jp-map-control',
  template: ''
})
export class MapControlComponent {
  @Output() mapLoaded = new EventEmitter();

  constructor(private _wrapper: GoogleMapsAPIWrapper) {
    this._wrapper.getNativeMap().then((m) => {
      this.mapLoaded.emit(m);
    }).catch((e) => {
      console.error('Error getting map: ', e);
    });
  }
}
