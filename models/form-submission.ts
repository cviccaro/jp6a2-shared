export class FormSubmission {
	first_name: string = '';
	last_name: string = '';
	company: string = '';
	email: string = '';
	phone: string = '';
	contact_time: any = '';
	comments: string = '';
	division: string;

	constructor(values?: { [key: string]: any }) {
		for (let key in values) {
			(<any>this)[key] = values[key];
		}
	}

	createFormData() {
		let form = new FormData();

		for (let key in this) {
			let val = (<any>this)[key];
			if (typeof val !== 'function') form.append(key, val);
		}

		return form;
	}
}
