import { Component, OnDestroy, afterRender } from '@angular/core';
import { AccountService } from '../../../../services';
import { IRegisterRequest, IRegisterResponse, IUserDto } from '../../../../models';
import { Router } from '@angular/router';
import { Subscription, delay } from 'rxjs';
import { HttpUtil } from '../../../../utils';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    NgFor,
    ReactiveFormsModule
  ],
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent {
  userData: IUserDto | undefined;
  registerForm: FormGroup;
  formBuilder: FormBuilder;
  subscription = new Subscription();

  constructor(
    private accountService: AccountService,
    private router: Router

  ) {
    this.formBuilder = new FormBuilder();
    this.registerForm = new FormGroup<IRegisterRequest>(
      {
        firstName: new FormControl<string>('', { nonNullable: true }),
        lastName: new FormControl<string>('', { nonNullable: true }),
        calledName: new FormControl<string>('', { nonNullable: true }),
        email: new FormControl<string>('', { nonNullable: true }),
        password: new FormControl<string>('', { nonNullable: true }),
        confirmPassword: new FormControl<string>('', { nonNullable: true }),
      }
    );
  }

  async ngOnInit() {
    await this.getUserProfile();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async getUserProfile(): Promise<void> {
    this.registerForm.controls['firstName'].setValue('firstName');
    this.registerForm.controls['lastName'].setValue('lastName');
    this.registerForm.controls['calledName'].setValue('calledName');
    this.registerForm.controls['email'].setValue('email');
    // this.subscription.add(
    //   await this.accountService.getUserProfile()
    //     .subscribe({
    //       next: (result: IRegisterResponse) => {
    //         this.registerForm = this.formBuilder.group(result);

    //         this.registerForm.disable();
    //       }, error: (e) => {

    //       }, complete: () => {

    //       }
    //     })
    // );
  }
}
