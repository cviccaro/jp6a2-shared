export class ContactFormSubmission {
	first_name = '';
	last_name = '';
	company = '';
	email = '';
	phone = '';
	contact_time: any = '';
	comments = '';
	division: string;

	constructor(values?: { [key: string]: any }) {
		for (const key in values) {
			(<any>this)[key] = values[key];
		}
	}

	createFormData() {
		const form = new FormData();

		for (const key in this) {
			const val = (<any>this)[key];
			if (typeof val !== 'function') form.append(key, val);
		}

		return form;
	}
}

export class SubscribeFormSubmission {
    email: string;

    constructor(values?: { [key: string]: any }) {
        for (const key in values) {
            (<any>this)[key] = values[key];
        }
    }

    createFormData() {
        const form = new FormData();

        for (const key in this) {
            const val = (<any>this)[key];
            if (typeof val !== 'function') form.append(key, val);
        }

        return form;
    }
}
