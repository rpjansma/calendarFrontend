import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { TokenService } from '../token/token.service';
import { UserService } from '../user-service/user.service';

const API_URL = 'http://localhost:4000';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private userService: UserService) {}

  authenticate(username: string, password: string) {
    return this.http
      .post(
        API_URL + '/users/authenticate',
        { username, password },
        { observe: 'response' }
      )
      .pipe(
        tap((res) => {
          const authToken = res.headers.get('x-access-token');
          this.userService.setToken(authToken);
          console.log(`User ${username} authenticated with token ${authToken}`);
        })
      );
  }

  refreshToken() {}
}
