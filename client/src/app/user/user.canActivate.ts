import {Injectable} from "@angular/core";
import {CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable, BehaviorSubject} from "rxjs";

import {UserService} from './user.service';
import {AuthService} from "../auth/auth.service";

@Injectable()
export class UserCanActivate implements CanActivate, CanActivateChild {
  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return Observable.create((observer) => {
      this.authService.isLoggedIn()
        .subscribe((access) => {
          if (access) {
            observer.next(access)
          } else {
            this.router.navigate(['/auth/sign-in']);
            observer.next(access)
          }
        });
    });


  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }
}
