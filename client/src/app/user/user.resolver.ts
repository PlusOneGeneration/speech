import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, BehaviorSubject} from "rxjs";

import {User} from './User';
import {UserService} from "./user.service";

@Injectable()
export class UserResolver implements Resolve<User> {

  constructor(private userService: UserService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User {
    return new Promise((resolve, reject) => {
      this.userService.me()
        .then((user) => {
          if (!user) {
            this.router.navigate(['auth', 'sign-in']);
          }
          resolve(user);
        })
        .catch((err) => {
          this.router.navigate(['auth', 'sign-in'])
          reject(err)
        });
    })
  };
}
