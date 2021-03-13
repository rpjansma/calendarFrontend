import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

const API_URL = 'http://localhost:4000';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getAllEvents() {
    return this.http
      .get(
        API_URL + '/events'
      )
      .pipe(tap( res => {
        const events = res.body
        console.log(events)
      }));
  }

  createEvent() {}

  updateEvent() {}

  deleteEvent() {}
}
