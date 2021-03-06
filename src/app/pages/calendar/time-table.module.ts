import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../../shared/shared.module';
import { TimeTableComponent } from './time-table.component';

@NgModule({
  imports: [
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [],
  declarations: [TimeTableComponent],
  providers: [],
})
export class TimeTableModule {}
