import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { HomeComponent } from './homePage/home.component';
import { SignInComponent } from './homePage/signIn/signin.component';
import { SignUpComponent } from './homePage/signUp/signup.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

@NgModule({
  imports: [ReactiveFormsModule, CommonModule, SharedModule, RouterModule],
  exports: [],
  declarations: [
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    NotFoundComponent,
    PortfolioComponent,
  ],
  providers: [],
})
export class PagesModule {}
