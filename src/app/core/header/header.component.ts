import { Observable } from 'rxjs';

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../shared/interfaces/user-interface';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user-service/user.service';

@Component({
  selector: 'c-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user$: Observable<User>;
  aba: string = 'home';

  constructor(
    private userService: UserService,
    private router: Router,
    private auth: AuthService
  ) {
    this.user$ = userService.getUser();
    console.log(this.auth.refreshToken());
  }

  isLogged() {
    return this.userService.isLogged();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['']);
  }
}
