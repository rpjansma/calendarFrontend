import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EventService } from '../../core/event-service/event.service';
import { SharedModule } from '../../shared/shared.module';
import { TimeTableComponent } from './time-table.component';

@NgModule({
  imports: [
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    BsDatepickerModule.forRoot(),
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [],
  declarations: [TimeTableComponent],
  providers: [EventService],
})
export class TimeTableModule {}
