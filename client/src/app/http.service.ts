import {Injectable} from "@angular/core";
import {
  Http,
  Headers,
  XHRBackend,
  RequestOptionsArgs,
  Request,
  Response,
  RequestOptions
} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import {UserTokenService} from "./user/services/user-token.service";

@Injectable()
export class HttpService extends Http {

  constructor(backend: XHRBackend, options: RequestOptions,
              private userTokenService: UserTokenService) {
    super(backend, options);
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    let token = this.userTokenService.getToken();

    if (typeof url === 'string') {
      if (!options) {
        options = {headers: new Headers()};
      }
      options.headers.set('Authorization', `Bearer ${token}`);
    } else {
      url.headers.set('Authorization', `Bearer ${token}`);
    }
    return super.request(url, options);
  }
}

