import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
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
