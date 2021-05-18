import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CalendarGuard } from './../core/auth/calendar.guard';
import { TimeTableComponent } from './calendar/time-table.component';
import { EventHubComponent } from './event-hub/event-hub.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';

const pageRoutes: Routes = [
  {
    path: 'calendar',
    canActivate: [CalendarGuard],
    component: TimeTableComponent,
  },

  {
    path: 'about',
    component: AboutComponent,
  },

  {
    path: 'hub',
    canActivate: [CalendarGuard],
    component: EventHubComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(pageRoutes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
