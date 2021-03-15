import { Component } from '@angular/core';
import { UserService } from '../user-service/user.service';
import { Observable } from 'rxjs';
import { User } from '../../shared/interfaces/user-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'c-header',
  templateUrl: './header.component.html',
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
