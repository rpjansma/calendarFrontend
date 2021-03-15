import { HomeModule } from './pages/homePage/home.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { CoreModule } from './core/core.module'
import { ErrorsModule } from './pages/errors/errors.module'



@NgModule({
  declarations: [AppComponent, CalendarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    CoreModule,
    ErrorsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
