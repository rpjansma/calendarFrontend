import { Component, OnInit } from '@angular/core';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { EventService } from '../../core/event-service/event.service';

@Component({
  selector: 'c-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  calendarView = CalendarView;
  events = [];

  constructor(private eventService: EventService) {}

  setView(view: CalendarView) {
    this.view = view;
  }

   dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {

  }

  ngOnInit(): void {}
}
