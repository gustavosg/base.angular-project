import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export interface String {
}

export function comparePasswords(firstValueComparer: string, secondValueComparer: string): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    return c.get(firstValueComparer)?.value == c.get(secondValueComparer)?.value ? null : { nomatch: true };
  }
}
