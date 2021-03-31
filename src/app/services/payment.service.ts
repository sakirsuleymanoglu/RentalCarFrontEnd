import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCardResponseModel } from '../models/creditCardResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = 'https://localhost:44394/api/';

  constructor(private httpClient:HttpClient) { }
  
  getCreditCardByCustomerId(customerId:number):Observable<CreditCardResponseModel>{
    let newPath = this.apiUrl + 'Payments/getbycustomerid?customerId='+customerId;
    return this.httpClient.get<CreditCardResponseModel>(newPath);
  }

}
