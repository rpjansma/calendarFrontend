import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

const API_URL = 'http://localhost:4000';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http
      .get(
        API_URL + '/users'
      )
      .pipe(tap( res => {
        const events = res.body
        console.log(events)
      }));
  }

  createUser(username: string, email: string, password: string) {
    return this.http
      .post(
        API_URL + '/users',
      { username, email, password },
      { observe: 'response' }
      )
      .pipe(tap( res => {
        const body = res.body
        console.log(body)
      }));
  }

  deleteUser() {}
}
