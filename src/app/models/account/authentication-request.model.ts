import { FormControl } from "@angular/forms";
import { TokenType } from "../../assets";

export interface IAuthenticationRequest {
    login: FormControl,
    password: FormControl;
    tokenType: FormControl;
    refreshToken: FormControl;
}

export interface IRefreshTokenRequest {
    refreshToken: string,
    TokenType: TokenType.refresh
}
