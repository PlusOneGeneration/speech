import {Injectable} from "@angular/core";
import {Resource, ResourceAction, ResourceParams} from "ngx-resource";
import {RequestMethod} from "@angular/http";
import {ResourceMethod, ResourceMethodStrict} from 'ngx-resource/src/Interfaces';
import {Record} from "../record/Record";

@Injectable()
@ResourceParams({
  url: '/api/users'
})
export class UserResource extends Resource {

  @ResourceAction({
    method: RequestMethod.Get,
    path: '/me'
  })
  getMe: ResourceMethod<any, any>;

  @ResourceAction({
    method: RequestMethod.Get,
    path: '/{!userId}/records',
    isArray: true
  })
  userRecords: ResourceMethod<any, Record[]>;


  @ResourceAction({
    method: RequestMethod.Get,
    path: '/{!userId}/records/total'
  })
  getTotalUserRecords: ResourceMethod<any, {total:number}>;

}
