import { Component } from '@angular/core';
import { HeaderComponent } from '../header';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { AuthService, LocalStorageService, SidebarService } from '../../../services';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,

    RouterModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  public stateMenu: string = 'side';

  constructor(
    private authService: AuthService,
    private localStorage: LocalStorageService,
    private sidebarService: SidebarService
  ) {

  }

  getSidebarStatus() {
    return this.sidebarService.opened;
  }

  toggleMenu() {
    this.sidebarService.toggleSidenav();
  }



  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

}
