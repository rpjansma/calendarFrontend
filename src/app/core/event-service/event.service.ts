import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Event } from '../../shared/interfaces/event-interface';

const API_URL = 'http://localhost:4000';
@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  getAllEvents() {
    return this.http.get(API_URL + '/events').pipe(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong!');
      })
    );
  }

  createEvent(
    title: string,
    description: string,
    start: Date,
    end: Date,
    token: string
  ) {
    return this.http
      .post(
        API_URL + '/events',
        { title, description, start, end, token },
        { observe: 'response' }
      )
      .pipe(
        tap((res) => {
          const body = res.body;
          console.log(body);
        })
      );
  }

  updateEvent() {}

  deleteEvent() {}
}
