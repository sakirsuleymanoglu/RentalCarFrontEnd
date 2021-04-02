import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Token } from '../models/token';
import { UserForLoginDto } from '../models/userForLoginDto';

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
}
