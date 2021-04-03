import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Token } from '../models/token';
import { User } from '../models/user';
import { UserForLoginDto } from '../models/userForLoginDto';
import { UserForRegisterDto } from '../models/userForRegisterDto';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:44394/api/';

  constructor(private httpClient: HttpClient) {}

  login(
    userForLoginDto: UserForLoginDto
  ): Observable<SingleResponseModel<Token>> {
    let loginPath = this.apiUrl + 'Auths/login';
    return this.httpClient.post<SingleResponseModel<Token>>(
      loginPath,
      userForLoginDto
    );
  }

  isAuthenticated() {
    if(localStorage.getItem('token')){
      return true;
    }
    return false;
  }

  register(
    userForRegisterDto: UserForRegisterDto
  ): Observable<SingleResponseModel<User>> {
    let registerPath = this.apiUrl + 'Auths/register';
    return this.httpClient.post<SingleResponseModel<User>>(
      registerPath,
      userForRegisterDto
    );
  }
}
