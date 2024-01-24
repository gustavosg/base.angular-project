import { Injectable } from '@angular/core';
import { HttpUtil } from '../utils/http.utils';
import { IUserDto } from '../models/user/user-dto.model';
import { Observable, delay, retry } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IChangePasswordRequest, IChangePasswordResponse, IRegisterResponse } from '../models';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(

    private http: HttpClient) { }


  getUserProfile(): Observable<IRegisterResponse> {

    let url: string = HttpUtil.constructUrl('account/my-profile');
    return this.http.get<IRegisterResponse>(url)
      .pipe(
        delay(300),
        HttpUtil.handleRetryError(300)
      );
  }

  changePassword(form: IChangePasswordRequest): Observable<any> {
    let url: string = HttpUtil.constructUrl('account/change-password');
    return this.http.put<IChangePasswordResponse>(url, JSON.stringify(form))
      .pipe(
        delay(300),
        HttpUtil.handleRetryError(300)
      )
      ;
  }
}
