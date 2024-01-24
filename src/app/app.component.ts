import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { FooterComponent, HeaderComponent, SidenavComponent, SpinnerComponent } from './templates';
import { AuthService } from './services/auth/auth.service';
import { AppModule } from './app.module';
import { ToastrModule, ToastrService, provideToastr } from 'ngx-toastr';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        RouterModule,
        HeaderComponent,
        FooterComponent,
        SidenavComponent,
        SpinnerComponent,
        AppModule,

    ],
    providers: [
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'Base Angular Project';
    logged = false;

    constructor(private authService: AuthService) {

    }

    isLogged() {
        return this.authService.isAuthenticated();

    }

}
