import { tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { TokenService } from '../token/token.service';
import { UserService } from '../user-service/user.service';

const API_URL = environment.api;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private userService: UserService) {}

  authenticate(username: string, password: string) {
    return this.http.post(
      API_URL + '/users/authenticate',
      { username, password },
      { observe: 'response' }
    );
  }

  refreshToken() {}
}
