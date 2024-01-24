import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth/auth.service';
import { LocalStorageService, SidebarService } from '../../../services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    NgbModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title = 'Base Angular Project';

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private sidenav: SidebarService
  ) {

  }

  ngOnInit() {
    this.isLogged();
  }

  getCalledName() {
    return this.localStorageService.get(this.authService.CALLED_NAME);
  }

  isLogged() {
    var logged = this.authService.isAuthenticated();

    return logged;
  }

  logout() {
    let result = this.authService.logout();

    if (result)
      this.router.navigate(['/']);
  }

  toggleMenu() {
    //@TODO create navigation service
    this.sidenav.toggleSidenav();
  }
}

