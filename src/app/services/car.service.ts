import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDto } from '../models/carDto';
import { CarDtoResponseModel } from '../models/carDtoResponseModel';
import { CarResponseModel } from '../models/carResponseModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44394/api/';

  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'Cars/getall';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getDetailsOfCars(): Observable<ListResponseModel<CarDto>> {
    let newPath = this.apiUrl + 'Cars/getallwithdetails';
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  getDetailsOfCarsByBrand(
    brandId: number
  ): Observable<ListResponseModel<CarDto>> {
    let newPath =
      this.apiUrl + 'Cars/getallwithdetailsbybrandid?brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  getDetailsOfCarsByColor(
    colorId: number
  ): Observable<ListResponseModel<CarDto>> {
    let newPath =
      this.apiUrl + 'Cars/getallwithdetailsbycolorid?colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  getDetailsOfCarByCarId(carId: number): Observable<CarDtoResponseModel> {
    let newPath = this.apiUrl + 'Cars/getwithdetailsbycarid?carId=' + carId;
    return this.httpClient.get<CarDtoResponseModel>(newPath);
  }

  getCarById(carId: number): Observable<CarResponseModel> {
    let newPath = this.apiUrl + 'Cars/getbyid?id=' + carId;
    return this.httpClient.get<CarResponseModel>(newPath);
  }
}
