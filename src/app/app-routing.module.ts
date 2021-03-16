import { CalendarComponent } from './pages/calendar/calendar.component';
import { SignInComponent } from './pages/homePage/signIn/signin.component';
import { SignUpComponent } from './pages/homePage/signUp/signup.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { AuthGuard } from './core/auth/auth.guard';
import { HomeComponent } from './pages/homePage/home.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: SignInComponent
      },
      {
        path: 'register',
        component: SignUpComponent
      },
    ]
  },

  {
    path: 'calendar',
    component: CalendarComponent,
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
