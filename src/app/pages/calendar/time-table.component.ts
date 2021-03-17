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
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { EventService } from '../../core/event-service/event.service';
import { TokenService } from '../../core/token/token.service';

@Component({
  selector: 'c-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './time-table.component.html',
})
export class TimeTableComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @ViewChild('modalEvent', { static: true }) modalEvent: TemplateRef<any>;

  eventForm: FormGroup;

  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  calendarView = CalendarView;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-edit"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
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

  refresh: Subject<any> = new Subject();

  activeDayIsOpen: boolean = false;

  closeResult = '';

  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  };

  events: CalendarEvent[] = [
  ];

  constructor(
    private eventService: EventService,
    private modal: NgbModal,
    private formBuilder: FormBuilder,
    private tokenService: TokenService
  ) {}

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
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalContentData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  open(content) {
    this.modal.open(content).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getEventList() {
    this.eventService
    .getAllEvents()
    .subscribe((data:any) => {
      console.log(data);
      this.events = data.data;
    });
    console.log(this.events)
  }

  addEvent(): void {

    const title = this.eventForm.get('title')?.value;
    const description = this.eventForm.get('description')?.value;
    const start = this.eventForm.get('start')?.value;
    const end = this.eventForm.get('end')?.value;
    const token = this.tokenService.getToken();
    console.log(token)

    this.eventService.createEvent(title, description, start, end, token).subscribe();

  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  createEvent(title, description, start, end, token) {
    this.eventService.createEvent(title, description, start, end, token);
    return
  }

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      start: ['', Validators.required],
      end: [''],
    });

    this.getEventList();

  }

}
