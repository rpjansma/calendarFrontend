import { Observable } from 'rxjs';

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../shared/interfaces/user-interface';
import { UserService } from '../user-service/user.service';

@Component({
  selector: 'c-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user$: Observable<User>;

  constructor(private userService: UserService, private router: Router) {
    this.user$ = userService.getUser();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['']);
  }
}
