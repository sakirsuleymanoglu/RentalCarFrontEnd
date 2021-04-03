import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { OperationClaim } from '../models/operationClaim';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://localhost:44394/api/';

  constructor(private httpClient: HttpClient) {}

  getUserByEMail(email: string): Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + 'Users/getbymail?email=' + email;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  getClaims(userId: number): Observable<ListResponseModel<OperationClaim>> {
    let newPath = this.apiUrl + 'Users/getclaims?userId=' + userId;
    return this.httpClient.get<ListResponseModel<OperationClaim>>(newPath);
  }

  CheckIfIsAdmin(userId:number):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'Users/isadmin?userId='+ userId;
    return this.httpClient.get<ResponseModel>(newPath);
  }
}
