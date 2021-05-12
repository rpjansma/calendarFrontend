import {
    CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView
} from 'angular-calendar';
import {
    addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays
} from 'date-fns';
import { BehaviorSubject, Observable } from 'rxjs';

import {
    ChangeDetectionStrategy, Component, EventEmitter, OnInit, TemplateRef, ViewChild
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EventService } from '../../core/event-service/event.service';
import { TokenService } from '../../core/token/token.service';
import { UserService } from '../../core/user-service/user.service';

@Component({
  selector: 'c-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss'],
})
export class TimeTableComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  eventForm: FormGroup;

  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  calendarView = CalendarView;

  events: CalendarEvent[] = [];

  actions: CalendarEventAction[] = [
    {
      label: '<i class="ml-1 fa fa-edit fa-lg"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="ml-2 fa fa-trash fa-lg"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.deleteEvent(event);
      },
    },
  ];

  modalContentData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: BehaviorSubject<any> = new BehaviorSubject(null);

  activeDayIsOpen: boolean = false;

  eventEmissor = new EventEmitter();

  public loading: boolean = false;

  constructor(
    private eventService: EventService,
    private modal: NgbModal,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private userService: UserService
  ) {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
    });

  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }

  open(content): void {
    this.modal.open(content);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent) {
    this.editMoving(event, newStart, newEnd);

    this.closeOpenMonthViewDay();
  }

  editMoving(event, newStart, newEnd) {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalContentData = { event, action };
    this.modal.open(this.modalContent);
  }

  getTimezoneOffsetString(date: Date): string {
    const timezoneOffset = date.getTimezoneOffset();
    const hoursOffset = String(
      Math.floor(Math.abs(timezoneOffset / 60))
    ).padStart(2, '0');
    const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
    const direction = timezoneOffset > 0 ? '-' : '+';

    return `T00:00:00${direction}${hoursOffset}:${minutesOffset}`;
  }

  fetchEventList(): void {
    const id = this.userService.getUserId();
    this.events = [];
    this.eventService.getUserEvents(id).subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        this.events.push({
          id: res[i]._id,
          title: res[i].title,
          start: new Date(res[i].start),
          end: new Date(res[i].end),
          draggable: true,
          actions: this.actions,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        });
      }
      this.refresh.next(this.events);
    });
  }

  newEvent() {
    const user = this.userService.getUserId();
    const title = this.eventForm.get('title')?.value;
    const start = this.eventForm.get('start')?.value;
    const end = this.eventForm.get('end')?.value;

    this.createEvent(user, title, start, end);
    this.eventForm.reset();
    this.fetchEventList();
    this.modal.dismissAll();
  }

  editEvent() {
    const id: any = this.modalContentData.event.id;
    const title = this.eventForm.get('title')?.value;
    const start = this.eventForm.get('start')?.value;
    const end = this.eventForm.get('end')?.value;

    this.updateEvent(id, title, start, end);

    this.eventForm.reset();
    this.fetchEventList();
    this.modal.dismissAll();
    this.closeOpenMonthViewDay();
  }

  deleteEvent(eventToDelete: CalendarEvent, id: any = ''): void {
    this.events = this.events.filter((event) => event !== eventToDelete);
    id = eventToDelete.id;
    this.eventService.deleteEvent(id).subscribe();
    this.refresh.next(this.events);
    this.closeOpenMonthViewDay();
  }

  createEvent(user, title, start, end) {
    this.eventService.createEvent(user, title, start, end).subscribe();
    return;
  }

  updateEvent(id, title, start, end) {
    this.eventService.updateEvent(id, title, start, end).subscribe();
    return;
  }

  ngOnInit(): void {
    this.fetchEventList();
  }
}
