import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FindeksService {
  constructor() {}

  checkFindeks(userFindeks:any, carFindeks:any): boolean {
    let uFindeks = parseInt(userFindeks);
    let cFindeks = parseInt(carFindeks);
    if (uFindeks > cFindeks) {
      return true;
    }
    return false;
  }
}
