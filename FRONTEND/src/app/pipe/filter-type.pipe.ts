import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterType'
})
export class FilterTypePipe implements PipeTransform {

  transform(value: any, searchValue: any): any {
    if(!searchValue){
      return value;
    }
    
    return value.filter(
      (v: { Type: string; }) => v.Type.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
  }

}
