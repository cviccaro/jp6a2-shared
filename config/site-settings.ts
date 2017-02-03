import { ManagedFile } from '../models/file';

export class SiteSettings {
	public main_site_background: ManagedFile;
	public main_site_logo: ManagedFile;
	public main_site_splash_body: string;
	public main_site_splash_headline: string;
	public main_site_title: string;

	constructor(config: any[]) {
    config.forEach((setting: any) => {
    	(<any>this)[setting.name] = setting.value;
    });
	}
}
