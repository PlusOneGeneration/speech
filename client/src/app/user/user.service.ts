import {Injectable} from "@angular/core";
import {UserResource} from "./user.resource";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {User} from "./User";
import {Record} from "../record/Record";

@Injectable()
export class UserService {
  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private userResource: UserResource) {
  }

  me(): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      if (this.user$.getValue()) {
        resolve(this.user$.getValue());
      } else {
        this.getMe()
          .subscribe(
            (user) => {
              this.user$.next(user);
              resolve(user);
            },
            (error) => reject(error)
          );
      }
    });
  }

  getMe(): Observable<User> {
    return this.userResource.getMe()
      .$observable
  }

  myRecords(): Observable<Record[]> {
    let userId = this.user$.getValue()._id;

    return this.userResource.userRecords({userId: userId})
      .$observable;
  }
}
