export * from './map-control.component';
export * from './map.component';
export * from './geolocate.service';

import { MapControlComponent } from './map-control.component';
import { MapComponent } from './map.component';

export const MAP_COMPONENTS = [
	MapComponent,
	MapControlComponent
];
