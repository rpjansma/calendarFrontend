import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { EventService } from '../../core/event-service/event.service';
import { TokenService } from '../../core/token/token.service';
import { UserService } from '../../core/user-service/user.service';

@Component({
  selector: 'c-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './time-table.component.html',
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

  modalEventData: {
    username: string;
    email: string;
    password: string;
  };

  refresh: BehaviorSubject<any> = new BehaviorSubject(null);

  activeDayIsOpen: boolean = false;

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
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      console.log(iEvent);
      return iEvent;
    });
    this.eventService
      .updateEvent(event.id, event.title, event.start, event.end)
      .subscribe();

    this.closeOpenMonthViewDay();
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

  open(content) {
    this.modal.open(content);
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  fetchEventList() {
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

  addEvent(): void {
    const user = this.userService.getUserId();
    const title = this.eventForm.get('title')?.value;
    const start = this.eventForm.get('start')?.value;
    const end = this.eventForm.get('end')?.value;

    this.eventService.createEvent(user, title, start, end).subscribe();
    this.eventForm.reset();
    this.fetchEventList();
    this.modal.dismissAll();
  }

  editEvent(): void {
    const id: any = this.modalContentData.event.id;
    const title = this.eventForm.get('title')?.value;
    const start = this.eventForm.get('start')?.value;
    const end = this.eventForm.get('end')?.value;

    this.eventService.updateEvent(id, title, start, end).subscribe();
    this.eventForm.reset();
    this.fetchEventList();
    this.modal.dismissAll();
    this.closeOpenMonthViewDay();
  }

  deleteEvent(eventToDelete: CalendarEvent, id: any = '') {
    this.events = this.events.filter((event) => event !== eventToDelete);
    id = eventToDelete.id;
    this.eventService.deleteEvent(id).subscribe();
    this.refresh.next(this.events);
    this.closeOpenMonthViewDay();
  }

  createEvent(user, title, start, end) {
    this.eventService.createEvent(user, title, start, end);
    return;
  }

  updateEvent(id, title, start, end) {
    this.eventService.updateEvent(id, title, start, end);
    return;
  }

  ngOnInit(): void {
    this.fetchEventList();
  }
}
