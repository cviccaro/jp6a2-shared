import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class EmailValidator {
	static emailFormat(control: FormControl) {
		var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        let empty = control.value === null || control.value === undefined || control.value === '';

        if (!empty && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
            return {
            	validateEmail: {
            		valid: false
            	}
            };
        }

        return null;
	}
}
