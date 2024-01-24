import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, NgFor } from '@angular/common';
import { SexList } from '../../../../assets';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IRegisterRequest, IRegisterResponse } from '../../../../models';
import { RegisterService } from '../../../../services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AspNetHttpThrowResponse } from '../../../../models';
import { comparePasswords } from '../../../../utils';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public SexEnum = SexList;
  public registerForm: FormGroup<IRegisterRequest>;

  constructor(
    private registerService: RegisterService,
    private toastrService: ToastrService,
    private router: Router
  ) {

    this.registerForm = new FormGroup<IRegisterRequest>(
      {
        firstName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
        lastName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
        calledName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
        email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
        password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,15}")] }),
        confirmPassword: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,15}")] })
        // gender: new FormControl<number | null>(SexEnum.NotIdentified),
        // phone: new FormControl<string>('31999999999'),
      }, { validators: comparePasswords('password', 'confirmPassword') }
    );

    this.clear();

  }

  ngOnInit() {

  }

  clear() {
    this.registerForm.reset();
  }

  /**
   * Submit account to server
   */
  public async submit() {

    let sendData: IRegisterRequest = this.registerForm.value as IRegisterRequest;

    // (await this.registerService.register(sendData))

    //   .subscribe({
    //     next: (registerResponse: IRegisterResponse) => {
          this.toastrService.success('Dados provavelmente foram enviados ¯\_(ツ)_/¯');
          this.router.navigate(['account/login']);
      //   }, error: (e) => {
      //     if (e.status == 0) {
      //       this.toastrService.error("Não foi possível conectar ao servidor. Tente novamente em alguns segundos.");
      //     }
      //     else {
      //       this.toastrService.error(e.error.detail);
      //     }

      //   }, complete: () => {
      //   }
      // });
  }
}
