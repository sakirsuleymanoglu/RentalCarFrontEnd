import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDtoResponseModel } from '../models/carDtoResponseModel';
import { CarResponseModel } from '../models/carResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrlByGetAll = "https://localhost:44394/api/Cars/getall";
  apiUrlByGetAllDetails = "https://localhost:44394/api/Cars/getallwithdetails"

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<CarResponseModel>{
    return this.httpClient.get<CarResponseModel>(this.apiUrlByGetAll);
  }

  getDetailsOfCars():Observable<CarDtoResponseModel>{
    return this.httpClient.get<CarDtoResponseModel>(this.apiUrlByGetAllDetails);
  }

}
