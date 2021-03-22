import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { VMessageModule } from '../shared/vmessage/vmessage.module';
import { HomeComponent } from './homePage/home.component';
import { SignInComponent } from './homePage/signIn/signin.component';
import { SignUpComponent } from './homePage/signUp/signup.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { VMessageComponent } from '../shared/vmessage/vmessage.component';




@NgModule({
  imports: [ReactiveFormsModule, CommonModule, VMessageModule, RouterModule],
  exports: [],
  declarations: [SignInComponent, SignUpComponent, HomeComponent, NotFoundComponent],
  providers: [VMessageComponent],
})
export class PagesModule {}
