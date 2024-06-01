import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatHours',
  standalone: true
})
export class DateFormatHoursPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const datePipe: DatePipe = new DatePipe('en-US');
    return datePipe.transform(value, 'dd/MM/yyyy HH:mm');
  }

}
