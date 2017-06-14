import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, BehaviorSubject} from "rxjs";

import {User} from './User';
import {UserService} from "./user.service";

@Injectable()
export class UserResolver implements Resolve<User> {

  constructor(private userService: UserService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | User {
    return this.userService.me();
  }
}
