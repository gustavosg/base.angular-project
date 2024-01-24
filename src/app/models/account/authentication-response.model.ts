import { TokenType } from "../../assets";

export interface IAuthenticationResponse {
  id: string,
  calledName: string,
  login: string,
  refreshToken: string,
  token: string,
  tokenType: TokenType,
  createdAt: Date,
  expiresAt: Date
}
