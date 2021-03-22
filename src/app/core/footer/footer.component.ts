import { Component } from '@angular/core';
import { UserService } from '../user-service/user.service';
import { Observable } from 'rxjs';
import { User } from '../../shared/interfaces/user-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'c-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {

  constructor() {}

}
