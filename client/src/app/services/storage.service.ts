import {Injectable} from '@angular/core';
import {LocalStorageService} from 'angular-2-local-storage';

@Injectable()

export class StorageService {
  constructor(private localStorageService: LocalStorageService) {
  }

  remove(key: string) {
    return this.localStorageService.remove(key);
  }

  set(key: string, value: string): void {
    this.localStorageService.set(key, value);
  }

  get(key: string) {
    return this.localStorageService.get(key) as string;
  }

}
