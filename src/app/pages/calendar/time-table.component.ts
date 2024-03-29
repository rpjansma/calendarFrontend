import {
    CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView
} from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { BehaviorSubject } from 'rxjs';
import {
    ModalFormEventService
} from 'src/app/core/services/modal-services/modal-form-event.service';

import {
    ChangeDetectionStrategy, Component, EventEmitter, OnInit, TemplateRef, ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EventService } from '../../core/services/event-service/event.service';
import { UserService } from '../../core/services/user-service/user.service';

@Component({
  selector: 'calendar',
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
    {
      label: '<i class="ml-2 spinner-grow-sm" *ngIf="loading"></i>',
      a11yLabel: 'Loading',
      onClick: ({ event }: { event: CalendarEvent }): void => {},
    },
  ];

  modalContentData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: BehaviorSubject<any> = new BehaviorSubject(null);

  activeDayIsOpen: boolean = false;

  eventEmissor = new EventEmitter();

  loading: boolean = false;

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

  getModal(modalzinho) {
    this.modalFormEventService.showEventForm(modalzinho);
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
      if (res != null) {
        console.log(res);
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
      }
    });
  }

  newEvent() {
    const user = this.userService.getUserId();
    const title = this.eventForm.get('title')?.value;
    const start = this.eventForm.get('start')?.value;
    const end = this.eventForm.get('end')?.value;

    this.createEvent(user, title, start, end);
    this.eventForm.reset();
  }

  editEvent() {
    const id: any = this.modalContentData.event.id;
    const title = this.eventForm.get('title')?.value;
    const start = this.eventForm.get('start')?.value;
    const end = this.eventForm.get('end')?.value;

    this.updateEvent(id, title, start, end);

    this.eventForm.reset();
    this.closeOpenMonthViewDay();
  }

  createEvent(user, title, start, end) {
    this.loading = true;
    this.eventService.createEvent(user, title, start, end).subscribe(
      () => {
        this.loading = false;
        this.fetchEventList();
        this.modal.dismissAll();
      },
      () => {}
    );
    return;
  }

  updateEvent(id, title, start, end) {
    this.loading = true;
    this.eventService.updateEvent(id, title, start, end).subscribe(
      () => {
        this.loading = false;
        this.fetchEventList();

        this.modal.dismissAll();
      },
      () => {}
    );
    return;
  }

  deleteEvent(eventToDelete: CalendarEvent, id: any = ''): void {
    this.loading = true;
    this.events = this.events.filter((event) => event !== eventToDelete);
    id = eventToDelete.id;
    this.eventService.deleteEvent(id).subscribe(
      () => {
        this.fetchEventList();
        this.loading = false;
      },
      () => {}
    );
    this.refresh.next(this.events);
    this.closeOpenMonthViewDay();
  }

  isRequiredAndTouched(control: string) {
    return (
      !this.eventForm.get(control).valid && this.eventForm.get(control).touched
    );
  }

  ngOnInit(): void {
    this.fetchEventList();
  }

  constructor(
    private eventService: EventService,
    private modal: NgbModal,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private modalFormEventService: ModalFormEventService
  ) {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
    });
  }
}
