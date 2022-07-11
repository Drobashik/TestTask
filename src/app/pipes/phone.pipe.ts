import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string): string {
    let format = "xxx (xxx) xxx xx xx";
  
    for(let i = 0; i < value.length; i++) {
      format = format.replace('x', value[i]);
    }
    return format;
  }

}
