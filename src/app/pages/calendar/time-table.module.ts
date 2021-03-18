import { NgModule } from '@angular/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { CommonModule } from '@angular/common';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VMessageModule } from '../../shared/vmessage/vmessage.module';
import { ReactiveFormsModule } from '@angular/forms';

import { TimeTableComponent } from './time-table.component';
import { EventService } from '../../core/event-service/event.service';

@NgModule({
  imports: [
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    VMessageModule,
  ],
  exports: [],
  declarations: [TimeTableComponent],
  providers: [EventService],
})
export class TimeTableModule {}
