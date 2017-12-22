import { JpFile } from '../core/models/file';
import { Tag } from './tag';
import { Division } from '../division/division';

export class Blog {
	id: any;
	title = '';

	divisions: Division[] = [];

	author = '';
	body = '';
	summary = '';

	image: JpFile;
	image_id: number;
	images: JpFile[] = [];
	splash: JpFile;
	splash_image_id: number;

	tags: Tag[] = [];

	created_at: any = null;
	updated_at: any = null;

	uri: string;
}
