import { JpClient } from '../client/client';
import { JpFile } from '../core/models/file';
import { Division } from '../division/division';

export class Project {
	id: any = undefined;
	title = '';
	body = '';
	image: JpFile = undefined;
    image_id: number = undefined;
    images: JpFile[] = [];
	client: JpClient = new JpClient();
    client_id: number = undefined;
    divisions: Division[] = [];
	created_at: any = undefined;
	updated_at: any = undefined;
}
