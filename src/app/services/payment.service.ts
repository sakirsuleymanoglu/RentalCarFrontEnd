import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = 'https://localhost:44394/api/';

  constructor(private httpClient:HttpClient) { }
  
  getCreditCardByCustomerId(customerId:number):Observable<SingleResponseModel<CreditCard>>{
    let newPath = this.apiUrl + 'Payments/getbycustomerid?customerId='+customerId;
    return this.httpClient.get<SingleResponseModel<CreditCard>>(newPath);
  }

}
