import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
  
import { SharedModule } from '../shared/shared.module';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { EventHubComponent } from './event-hub/event-hub.component';
import { HomeComponent } from './homePage/home.component';
import { SignInComponent } from './homePage/signIn/signin.component';
import { SignUpComponent } from './homePage/signUp/signup.component';
import { AboutComponent } from './about/about.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    PagesRoutingModule,
  ],
  exports: [],
  declarations: [
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    NotFoundComponent,
    AboutComponent,
    EventHubComponent,
  ],
  providers: [],
})
export class PagesModule {}
