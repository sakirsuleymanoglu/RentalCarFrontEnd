import { Pipe, PipeTransform } from '@angular/core';
import { CarDto } from '../models/carDto';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  
  transform(
    cars: CarDto[],
    brandName: string,
    model: string,
    modelYear: string,
    color: string
  ): CarDto[] {
    if (modelYear) {
      return cars.filter(
        (car: CarDto) => car.modelYear.indexOf(modelYear) !== -1
      );
    }
    if (color) {
      color = color.toLocaleLowerCase();
      return cars.filter(
        (car: CarDto) => car.colorName.toLocaleLowerCase().indexOf(color) !== -1
      );
    }
    if (brandName) {
      brandName = brandName.toLocaleLowerCase();
      return cars.filter(
        (car: CarDto) =>
          car.brandName.toLocaleLowerCase().indexOf(brandName) !== -1
      );
    }
    if (model) {
      model = model.toLocaleLowerCase();
      return cars.filter(
        (car: CarDto) => car.model.toLocaleLowerCase().indexOf(model) !== -1
      );
    }
    return cars;
  }
}
