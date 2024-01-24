import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IChangePasswordRequest } from '../../../../models/account/change-password-request.model';
import { AccountService, AuthService } from '../../../../services';
import { IChangePasswordResponse, IRegisterResponse } from '../../../../models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  standalone: true,
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  subscription = new Subscription();


  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.changePasswordForm = new FormGroup<IChangePasswordRequest>({
      currentPassword: new FormControl<string>(''),
      newPassword: new FormControl<string>(''),
      confirmPassword: new FormControl<string>(''),
    });

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

  clear() {
    this.changePasswordForm.reset();
  }

  async submit(): Promise<void> {
    this.subscription.add(
      await this.accountService.changePassword(this.changePasswordForm.value)
        .subscribe({
          next: (response: IChangePasswordResponse) => {

            if (response.status) {

              this.toastr.success(response.message)
              this.authService.logout();
              this.router.navigate(['/']);
            }
            else {
              let errors: string[] = response.message.split(',');

              for (let index in errors) {
                this.toastr.error(errors[index]);
              }
            }

          },
          error: (err: HttpErrorResponse) => {
            let errors: string[] = err.error.detail.split(',');

            for (let index in errors) {
              this.toastr.error(errors[index]);
            }
          },
          complete: () => {

          }
        })
    );
  }
}
