export * from './pager/index';
export * from './gallery-item.directive';
export * from './gallery.component';

import { PagerComponent } from './pager/index';
import { GalleryItemDirective } from './gallery-item.directive';
import { GalleryComponent } from './gallery.component';

export const GALLERY_COMPONENTS = [
	PagerComponent,
	GalleryComponent,
	GalleryItemDirective
];
