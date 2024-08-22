import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure:false //false => cost performance issue because it recheck during filter
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if (value.length === 0 || filterString === '') {
      return value;
    }
    const arr = [];
    for (const currValue of value) {
      if (currValue[propName] === filterString) {
        arr.push(currValue);
      }
    }
    return arr;
  }

}
