import {Injectable} from "@angular/core";
import {UserResource} from "./user.resource";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserService {
  constructor(private userResource: UserResource) {}

  getMe(): Observable<any> {
    return this.userResource.getMe()
      .$observable
  }
}
