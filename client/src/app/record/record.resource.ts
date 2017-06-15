import {Injectable} from "@angular/core";
import {Resource, ResourceAction, ResourceParams} from "ngx-resource";
import {RequestMethod} from "@angular/http";
import {ResourceMethod, ResourceMethodStrict} from 'ngx-resource/src/Interfaces';
import {Record} from "./Record";

@Injectable()
@ResourceParams({
  url: '/api/records'
})
export class RecordResource extends Resource {

  @ResourceAction({
    method: RequestMethod.Post,
    path: '/'
  })
  create: ResourceMethod<Record, Record>;

}
