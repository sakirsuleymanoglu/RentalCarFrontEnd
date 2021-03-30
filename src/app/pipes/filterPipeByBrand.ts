import { Pipe, PipeTransform } from '@angular/core';
import { CarDto } from '../models/carDto';

@Pipe({
  name: 'filterByBrand',
})
export class FilterPipeByBrand implements PipeTransform {
  transform(cars: CarDto[], brandName: string): CarDto[] {
    if (brandName) {
      brandName = brandName.toLocaleLowerCase();
      return cars.filter(
        (car: CarDto) =>
          car.brandName.toLocaleLowerCase().indexOf(brandName) !== -1
      );
    }
    return cars;
  }
}
