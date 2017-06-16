import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {environment} from '../environments/environment'

@Injectable()
export class FileUploadService {

  constructor(private http: Http) {
  }

  sendForm(fields: { fieldValue: string | File, fieldName: string }[], url?: string): Observable<any> {
    let formData: FormData = new FormData();

    fields.forEach((field) => {
      if (field.fieldValue instanceof File) {
        formData.append(field.fieldName, field.fieldValue, field.fieldValue.name);
      } else {
        formData.append(field.fieldName, field.fieldValue);
      }
    });

    return this.send(formData, url);
  }

  sendFile(file: File, fileField: string = 'file', url?: string): Observable<any> {
    let formData: FormData = new FormData();
    formData.append(fileField, file, file.name);

    return this.send(formData, url);
  }

  //TODO @@@dr rethink url in params
  send(formData: FormData, url: string = '/api/records'): Observable<any> {
    return Observable.create((observer) => {
      let headers = this.setHeaders([{name: 'Accept', value: 'application/json'}]);
      let options = new RequestOptions({headers: headers});

      this.http.post(url, formData, options)
        .map(res => res.json())
        .subscribe(
          data => observer.next(data),
          error => observer.error(error)
        )
    });
  }

  private setHeaders(headersList: [{ name: string, value: string }]): Headers {
    let headers = new Headers();

    headersList.map((header) => headers.append(header.name, header.value));

    return headers;
  }
}
