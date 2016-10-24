export * from './form-submission.service';
export * from './contact-form.component';
export * from './captcha.service';
export * from './textarea-autoexpand.directive';

import { ContactFormComponent } from './contact-form.component';
import { TextareaAutoexpandDirective } from './textarea-autoexpand.directive';

export const FORM_COMPONENTS = [
	ContactFormComponent,
	TextareaAutoexpandDirective
];
