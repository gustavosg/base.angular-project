import { FormControl } from "@angular/forms";

export interface IRegisterRequest {
  firstName: FormControl;
  lastName: FormControl,
  calledName: FormControl,
  email: FormControl,
  password: FormControl,
  confirmPassword: FormControl
  // gender: FormControl<number | null>,
  // phone: FormControl<string | null>,
}

