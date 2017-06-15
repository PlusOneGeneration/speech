import {Injectable} from "@angular/core";
import {RecordResource} from "./record.resource";
import {Observable} from "rxjs/Observable";
import {Record} from "./Record";

@Injectable()
export class RecordService {
  constructor(private recordResource: RecordResource) {}

  create(record: Record): Observable<Record> {
    return this.recordResource.create(record)
      .$observable;
  }
}
