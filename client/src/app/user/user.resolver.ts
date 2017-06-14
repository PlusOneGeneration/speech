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
    return Observable.create((observer) => {
      this.userService.me()
        .subscribe((user) => {
            if (!user) {
              //TODO @@@dr fix this redirect
              this.router.navigate(['auth', 'sign-in']);
            }

            observer.next(user);
          },
          (error) => {
            location.href = '/auth/sign-in';
          });
    });
  }
}
