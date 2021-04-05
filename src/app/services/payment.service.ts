import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() { }
  
  pay(userBalance:any, totalPrice:any){
    let balance = parseInt(userBalance);
    let tPrice = parseInt(totalPrice);
    if(balance>tPrice){
      return true;
    }
    return false;
  }

}
