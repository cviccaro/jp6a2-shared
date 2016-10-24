export * from './capitalize.pipe';
export * from './trimmed.pipe';

import { CapitalizePipe } from './capitalize.pipe';
import { TrimmedPipe } from './trimmed.pipe';

export const APP_PIPES = [
	CapitalizePipe,
	TrimmedPipe
];
