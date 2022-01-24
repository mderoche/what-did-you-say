import { Pipe, PipeTransform } from '@angular/core';

/**
 * Capitalizes the first character in a string.
 * If the input is not a string, returns an empty string.
 *
 * Examples:
 *     In:              Out:
 *      (null)           ''
 *      'hey'            'Hey'
 *      'two words'      'Two words'
 */
@Pipe({ name: 'capitalizeSentence' })
export class CapitalizeSentencePipe implements PipeTransform {
    transform(value: string): string {
        if (value && typeof value == 'string') {
            return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
        } else {
            return '';
        }
    }
}
