import { FormControl } from "@angular/forms";

export interface IChangePasswordRequest {
  currentPassword: FormControl;
  newPassword: FormControl;
  confirmPassword: FormControl;
}
