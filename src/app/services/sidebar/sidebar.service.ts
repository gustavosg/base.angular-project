import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public opened: boolean = true;
  constructor() {

  }

  toggleSidenav() {
    this.opened = !this.opened;
  }


}
