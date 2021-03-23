import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
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
        })
      );
  }

  createEvent(title: string, start: Date, end: Date, token: string) {
    return this.http
      .post(
        API_URL + '/events',
        { title, start, end, token },
        { observe: 'response' }
      )
      .pipe(
        tap((res) => {
          const body = res.body;
          console.log(body);
        })
      );
  }

  updateEvent(
    id: string,
    title: string,
    start: Date,
    end: Date,
    token: string
  ) {
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
        })
    );
  }

  deleteEvent(id: string) {
    return this.http.delete(API_URL + '/events/' + id);
  }
}
