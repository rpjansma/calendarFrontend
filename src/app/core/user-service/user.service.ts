import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { TokenService } from '../token/token.service';
import * as decoder from 'jwt-decode';
import { User } from '../../shared/interfaces/user-interface';

const API_URL = 'http://localhost:4000';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(null);
  private username: string;
  private id: string;

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.tokenService.hasToken() && this.decodeAndNotify();
  }

  setToken(token) {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  decodeAndNotify() {
    const token = this.tokenService.getToken();
    const user = decoder(token) as User;
    this.username = user.username;
    this.id = user.id;
    this.userSubject.next(user);
  }

  isLogged() {
    return this.tokenService.hasToken();
  }

  logout() {
    this.tokenService.removeToken();
    this.userSubject.next(null);
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  getUsername() {
    return this.username;
  }

  getUserId() {
    return this.id;
  }

  getAllUsers() {
    return this.http.get(API_URL + '/users').pipe(
      tap((res) => {
        const events = res;
        console.log(events);
      }),
      catchError((error) => {
          alert('Sorry, we had an error. Can you try again?');
          return of(null);
        })
    );
  }

  createUser(username: string, email: string, password: string) {
    return this.http
      .post(
        API_URL + '/users',
        { username, email, password },
        { observe: 'response' }
      )
      .pipe(
        tap((res) => {
          const body = res.body;
          console.log(body);
        }),
        catchError((error) => {
          alert('Sorry, we had an error. Can you try again?');
          return of(null);
        })
      );
  }

  deleteUser() {}
}
