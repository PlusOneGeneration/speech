import {Injectable} from "@angular/core";
import {AuthResource} from "./auth.resource";
import {Observable} from "rxjs/Observable";
import {UserService} from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(private authResource: AuthResource, private userService: UserService) {
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
}
