import { Injectable, afterRender } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storage!: Storage;
  constructor() {
    afterRender(() => {
      this.storage = window.localStorage;
    })
  }

  get(key: string): any {
    if (this.storage === undefined) return null;

    return this.storage.getItem(key);
  }

  set(key: string, value: any): boolean {
    this.storage.setItem(key, value);

    return true;
  }

  delete(key: string) {
    this.storage.removeItem(key);
  }

}
