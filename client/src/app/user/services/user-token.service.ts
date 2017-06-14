import {Injectable} from "@angular/core";
import {StorageService} from "../../services/storage.service";

@Injectable()
export class UserTokenService {

  constructor(private storageService: StorageService) {
  }

  setToken(token: string) {
    this.storageService.set('token', token);
  }

  getToken(): string {
    return this.storageService.get('token');
  }

  removeToken() {
    return this.storageService.remove('token');
  }
}
