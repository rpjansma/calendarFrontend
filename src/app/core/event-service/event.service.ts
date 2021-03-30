import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { CalendarEvent } from 'angular-calendar';
import { Event } from '../../shared/interfaces/event-interface';

const API_URL = 'http://localhost:4000';
@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  getAllEvents() {
    return this.http
      .get<Event[]>(API_URL + '/events', { observe: 'response' })
      .pipe(
        map((res) => {
          return res.body;
        }),
        catchError((error) => {
          alert('Sorry, we had an error. Can you try again?');
          return of(null);
        })
      );
  }

  getUserEvents(id: string, token: string) {
    return this.http
      .get<Event[]>(API_URL + '/events/' + id, { observe: 'response' })
      .pipe(
        map((res) => {
          return res.body;
        }),
        catchError((error) => {
          alert('Sorry, we had an error. Can you try again?');
          return of(null);
        })
      );
  }

  createEvent(
    user: string,
    title: string,
    start: Date,
    end: Date,
    token: string
  ) {
    return this.http
      .post(
        API_URL + '/events',
        { user, title, start, end, token },
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

  updateEvent(id: any, title: string, start: Date, end: Date, token: string) {
    return this.http
      .put(
        API_URL + '/events/' + id,
        { title, start, end, token },
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

  deleteEvent(id: string) {
    return this.http.delete(API_URL + '/events/' + id).pipe(
      catchError((error) => {
        alert('Sorry, we had an error. Can you try again?');
        return of(null);
      })
    );
  }
}
