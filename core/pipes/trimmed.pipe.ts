import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'trimmed'})
export class TrimmedPipe implements PipeTransform {
    transform(value: any, wordwise: boolean, max: any, tail: string) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            const lastspace = value.lastIndexOf(' ');
            if (lastspace !== -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    }
}
