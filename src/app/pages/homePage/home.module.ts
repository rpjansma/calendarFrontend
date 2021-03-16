import { RouterModule } from '@angular/router';
import { SignInComponent } from './signIn/signin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { VMessageModule } from './../../shared/vmessage/vmessage.module';
import { SignUpComponent } from './signUp/signup.component';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [ReactiveFormsModule, CommonModule, VMessageModule, RouterModule],
  declarations: [SignInComponent, SignUpComponent, HomeComponent],
})

export class HomeModule {}
