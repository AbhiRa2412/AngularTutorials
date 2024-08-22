import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'shorten',
})
export class ShortenPipes implements PipeTransform {
    transform(value: any, limit: number, upperCase: boolean) {
        if (value.length > limit && upperCase) {
            return value.substr(0, limit).toUpperCase() + '...';
        } else if (value.length > limit && !upperCase) {
            return value.substr(0, limit) + '...';
        }
        return value;
    }
    
}