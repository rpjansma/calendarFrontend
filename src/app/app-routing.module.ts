import { CalendarComponent } from './pages/calendar/calendar.component';
import { SignInComponent } from './pages/homePage/signIn/signin.component';
import { SignUpComponent } from './pages/homePage/signUp/signup.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { AuthGuard } from "./core/auth/auth.guard";

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'calendar',
    component: CalendarComponent
  },

  {
    path: 'register',
    component: SignUpComponent
  },

  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule],
})
export class AppRoutingModule {}
