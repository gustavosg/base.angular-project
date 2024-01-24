import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../../services/auth/auth.service';
import { IAuthenticationRequest, IAuthenticationResponse } from '../../../../models';
import { TokenType } from '../../../../assets';
import { LocalStorageService } from '../../../../services';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment'; import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup<IAuthenticationRequest>;

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private toastrService: ToastrService
  ) {

    this.loginForm = new FormGroup<IAuthenticationRequest>({
      login: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.email,
          Validators.required
        ]
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required
        ]
      }),
      tokenType: new FormControl(TokenType.grant, { nonNullable: true }),
      refreshToken: new FormControl()
    });
  }

  ngOnInit(): void {

    if (environment.debugMode) {

      this.loginForm = new FormGroup<IAuthenticationRequest>({
        // login: new FormControl('gustavosouzagoncalves@gmail.com', {
        login: new FormControl('', {
          nonNullable: true,
          validators: [
            Validators.email,
            Validators.required
          ]
        }),
        // login: new FormControl<string>(''),
        password: new FormControl('', {
          nonNullable: true,
          validators: [
            Validators.required
          ]
        }),
        tokenType: new FormControl(TokenType.grant, { nonNullable: true }),
        refreshToken: new FormControl()
      });
    }
  }

  clearFields() {
    this.loginForm.reset();
  }


  doLogin() {
    console.log(this.loginForm.value);
    let send: IAuthenticationRequest = this.loginForm.value as IAuthenticationRequest;

    this.localStorageService.set(this.authService.TOKEN_NAME, 'token');
    this.localStorageService.set(this.authService.REFRESH_TOKEN_NAME, 'refreshToken');
    this.localStorageService.set(this.authService.CALLED_NAME, 'calledName');

    this.router.navigate(['/']);
    this.toastrService.success('A gente acredita que você logou ¯\_(ツ)_/¯');



  }
}


