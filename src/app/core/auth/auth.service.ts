import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:4000';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {};

  authenticate(username: string, password: string) {
    return this.http.post(API_URL + '/users/authenticate', { username, password });
  };
}
