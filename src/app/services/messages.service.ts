import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  notNullMessage:string = "Boş bırakılamaz";
  findeksErrorMessage:string = "Arabayı kiralamak için findeks puanınız yetersiz";
  insufficientBalance = "Yetersiz bakiye";
  creditCardInsertionSuccessful = "Kredi kartı eklendi";

  constructor() { }
}
