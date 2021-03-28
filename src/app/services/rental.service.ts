import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDto } from '../models/rentalDto';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  private apiUrlByGetAllDetails =
    'https://localhost:44394/api/Rentals/getallwithdetails';

  constructor(private httpClient: HttpClient) {}

  getDetailsOfRentals(): Observable<ListResponseModel<RentalDto>>{
    return this.httpClient.get<ListResponseModel<RentalDto>>(this.apiUrlByGetAllDetails);
  }
}
