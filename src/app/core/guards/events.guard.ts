import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot
} from '@angular/router';

import { UserService } from '../services/user-service/user.service';

@Injectable({ providedIn: 'root' })
export class EventGuard implements CanActivate, CanLoad {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkAcess();
  }

  canLoad(route: Route) {
    return this.checkAcess();
  }

  checkAcess() {
    if (!this.userService.isLogged()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
