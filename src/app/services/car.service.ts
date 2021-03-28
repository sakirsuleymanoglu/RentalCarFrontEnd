import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDtoResponseModel } from '../models/carDtoResponseModel';
import { CarResponseModel } from '../models/carResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44394/api/";

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<CarResponseModel>{
    let newPath = this.apiUrl + "Cars/getall";
    return this.httpClient.get<CarResponseModel>(newPath);
  }

  getDetailsOfCars():Observable<CarDtoResponseModel>{
    let newPath = this.apiUrl + "Cars/getallwithdetails";
    return this.httpClient.get<CarDtoResponseModel>(newPath);
  }

  getDetailsOfCarsByBrand(brandId:number):Observable<CarDtoResponseModel>{
    let newPath = this.apiUrl + "Cars/getallwithdetailsbybrandid?brandId=" + brandId;
    return this.httpClient.get<CarDtoResponseModel>(newPath);
  }

  }

