import {Injectable} from "@angular/core";
import {RecordResource} from "./record.resource";
import {Observable} from "rxjs/Observable";
import {Record} from "./Record";
import {FileUploadService} from "../file-upload.service";

@Injectable()
export class RecordService {
  constructor(private recordResource: RecordResource,
              private fileUploadService: FileUploadService) {
  }

  create(record: Record): Observable<Record> {
    let recordForm: { fieldValue: string | File, fieldName: string }[] = [];

    for (let key in record) {
      recordForm.push({fieldValue: record[key], fieldName: key})
    }

    return this.fileUploadService.sendForm(recordForm);
  }
}
