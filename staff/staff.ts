import { ManagedFile } from '../core/models/file';

export interface Staff {
	id: number;
	first_name: string;
	last_name: string;
	full_name: string;
	email: string;
	image: ManagedFile;
	image_small: ManagedFile;
	linkedin: string;
	occupation: string;
	phone: string;
	updated_at: string;
	created_at: string;
	bio: string;
	title: string;
}
