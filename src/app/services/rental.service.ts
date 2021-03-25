import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalDtoResponseModel } from '../models/rentalDtoResponseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  private apiUrlByGetAllDetails =
    'https://localhost:44394/api/Rentals/getallwithdetails';

  constructor(private httpClient: HttpClient) {}

  getDetailsOfRentals(): Observable<RentalDtoResponseModel>{
    return this.httpClient.get<RentalDtoResponseModel>(this.apiUrlByGetAllDetails);
  }
}
