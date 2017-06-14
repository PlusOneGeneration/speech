import {Injectable} from "@angular/core";
import {AuthResource} from "./auth.resource";
import {Observable} from "rxjs/Observable";
import {UserService} from "../user/user.service";
import {UserTokenService} from "../user/services/user-token.service";

@Injectable()
export class AuthService {
  constructor(private authResource: AuthResource,
              private userService: UserService,
              private userTokenService: UserTokenService) {
  }

  isLoggedIn(): Observable<boolean> {
    return Observable.create((observer) => {
      this.userService
        .me()
        .subscribe((user) => {
          return observer.next(user ? true : false);
        });
    });
  }

  signOut(): Observable<boolean> {
    return Observable.create((observer) => {
      this.userService.user$.next(null);
      this.userTokenService.removeToken();

      observer.next(true);
    });
  }
}
