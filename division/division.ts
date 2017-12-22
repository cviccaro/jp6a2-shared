import { ManagedFile } from '../core/models/file';
import { Blog } from '../blog/blog';
import { Project } from '../project/project';

export class Division {
  created_at: string;
  blogs: Blog[];
  display_name: string;
  description: string;
  image: ManagedFile;
  image_id: number = null;
  id: number;
  name: string;
  projects: Project[];
  site_logo: any;
  site_title: string;
  splash_body: string;
  splash_headline: string;
  updated_at: any;

  constructor(config: { [key: string]: any }) {
    for (const key in config) {
      (<any>this)[key] = config[key];
    }
  }
}
