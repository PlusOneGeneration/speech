import {Injectable} from "@angular/core";
import {UserResource} from "./user.resource";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {User} from "./User";

@Injectable()
export class UserService {
  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private userResource: UserResource) {
  }

  me(): Observable<User> {
    if (this.user$.getValue()) {
      return this.user$;
    } else {
      return this.getMe();
    }
  }

  getMe(): Observable<User> {
    return this.userResource.getMe()
      .$observable
  }
}
