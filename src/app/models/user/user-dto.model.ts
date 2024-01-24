import { SexEnum } from "../../assets";

export interface IUserDto {
  firstName: string,
  lastName: string,
  fullName: string,
  calledName: string,
  gender: SexEnum,
  email: string,
  emailConfirmed: boolean,
  birthDate: Date,
  phone: string,
  phoneConfirmed: boolean,
  active: boolean,
}
