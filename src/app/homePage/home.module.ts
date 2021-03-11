import { SignInComponent } from './signIn/signin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { VMessageModule } from './../shared/vmessage/vmessage.module';


@NgModule({
  declarations: [SignInComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    VMessageModule
    ],
})
export class HomeModule {}
