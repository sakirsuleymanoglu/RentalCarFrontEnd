import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  add(key:string, value:any){
    let valueToString = value.toString();
    localStorage.setItem(key, value);
  }

  get(key:string){
    return localStorage.getItem(key);
  }

  delete(key:string){
    localStorage.removeItem(key);
  }


}
