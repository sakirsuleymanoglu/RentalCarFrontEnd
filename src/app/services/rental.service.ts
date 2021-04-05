import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDto } from '../models/rentalDto';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  private apiUrl = 'https://localhost:44394/api/';

  constructor(private httpClient: HttpClient) {}

  getDetailsOfRentals(): Observable<ListResponseModel<RentalDto>> {
    let newPath = this.apiUrl + 'Rentals/getallwithdetails';
    return this.httpClient.get<ListResponseModel<RentalDto>>(newPath);
  }

  add(rental: Rental): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'Rentals/add'
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }
}
