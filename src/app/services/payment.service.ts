import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl = 'https://localhost:44394/api/';

  constructor(private httpClient:HttpClient) { }

  getByCreditCard(cardNumber:string):Observable<CreditCard>{
    let newPath = this.apiUrl + 'Payments/getbycardnumber?cardNumber='+cardNumber;
    return this.httpClient.get<CreditCard>(newPath);
  }
}
