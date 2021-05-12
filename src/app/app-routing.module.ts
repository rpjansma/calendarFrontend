import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/auth/auth.guard';
import { CalendarGuard } from './core/auth/calendar.guard';
import { HubGuard } from './core/auth/hub.guard';
import { TimeTableComponent } from './pages/calendar/time-table.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { EventHubComponent } from './pages/event-hub/event-hub.component';
import { HomeComponent } from './pages/homePage/home.component';
import { SignInComponent } from './pages/homePage/signIn/signin.component';
import { SignUpComponent } from './pages/homePage/signUp/signup.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: SignInComponent,
      },
      {
        path: 'register',
        component: SignUpComponent,
      },
    ],
  },

  {
    path: 'calendar',
    canActivate: [CalendarGuard],
    component: TimeTableComponent,
  },

  {
    path: 'about',
    component: PortfolioComponent,
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
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
