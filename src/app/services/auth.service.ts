import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:44394/api/';

  constructor(private httpClient:HttpClient) {}

  login(userForLoginDto:UserForLoginDto):Observable<>{
    let loginPath = this.apiUrl + 'Auths/login';
    this.httpClient
  }
}
