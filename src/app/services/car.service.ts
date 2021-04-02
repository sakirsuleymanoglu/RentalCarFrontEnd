import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDto } from '../models/carDto';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

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

  getDetailsOfCarByCarId(carId: number): Observable<SingleResponseModel<CarDto>> {
    let newPath = this.apiUrl + 'Cars/getwithdetailsbycarid?carId=' + carId;
    return this.httpClient.get<SingleResponseModel<CarDto>>(newPath);
  }

  getCarById(carId: number): Observable<SingleResponseModel<Car>> {
    let newPath = this.apiUrl + 'Cars/getbyid?id=' + carId;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }

  add(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'Cars/add';
    return this.httpClient.post<ResponseModel>(newPath, car);
  }

  update(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'Cars/update';
    return this.httpClient.post<ResponseModel>(newPath, car);
  }
}
