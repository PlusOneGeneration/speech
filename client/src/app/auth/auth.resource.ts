import {Injectable} from "@angular/core";
import {Resource, ResourceAction, ResourceParams} from "ngx-resource";
import {RequestMethod} from "@angular/http";
import {ResourceMethod, ResourceMethodStrict} from 'ngx-resource/src/Interfaces';

@Injectable()
@ResourceParams({
  url: '/api/rooms/{!roomId}/messages'
})
export class AuthResource extends Resource {
  // @ResourceAction({
  //   method: RequestMethod.Get,
  //   // path: '/'
  //   path: '/api/users/me'
  // })
  // getMe: ResourceMethod<any, any>;

}
