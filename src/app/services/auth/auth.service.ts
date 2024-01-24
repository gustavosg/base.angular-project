import { Injectable } from '@angular/core';
import { HttpUtil } from '../../utils/http.utils';
import { IAuthenticationRequest, IAuthenticationResponse, IRefreshTokenRequest } from '../../models/account/index';
import { Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { LocalStorageService } from '../storage';
import { Router } from '@angular/router';
import { AspNetHttpThrowResponse } from '../../models';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  TOKEN_NAME: string = 'token';
  REFRESH_TOKEN_NAME: string = 'refreshToken';
  CALLED_NAME: string = 'calledName';
  headers = {
    'Content-Type': 'application/json'
  };

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router,
    private toastrService: ToastrService

  ) {

  }

  isAuthenticated(): boolean {
    let check = this.localStorageService.get(this.TOKEN_NAME);

    return check !== undefined && check !== null;
  }


  login(form: IAuthenticationRequest): Observable<any> {

    let url: string = HttpUtil.constructUrl('account/login');
    return this.http.post(url, JSON.stringify(form))
      .pipe(catchError(
        (error) => {
          console.log(error);
          // this.toastrService.error(error);
          return throwError(() => error);
        }));
  }

  logout() {
    this.localStorageService.delete(this.TOKEN_NAME);
    this.localStorageService.delete(this.REFRESH_TOKEN_NAME);
    this.localStorageService.delete(this.CALLED_NAME);

    return true;
  }

  refreshToken(form: IRefreshTokenRequest): Observable<any> {
    let url = HttpUtil.constructUrl('account/login');
    return this.http.post(url, JSON.stringify(form));
    // .subscribe(
    //     {
    //         next: (success: IAuthenticationResponse) => {
    //             this.localStorageService.set(this.TOKEN_NAME, success.token);
    //             this.localStorageService.set(this.REFRESH_TOKEN_NAME, success.refreshToken);
    //         },
    //         error: (e) => {
    //             if (e != undefined && e.name !== undefined && e instanceof HttpErrorResponse) {
    //                 let err: AspNetHttpThrowResponse = e.error;
    //                 this.localStorageService.delete(this.TOKEN_NAME);
    //                 this.localStorageService.delete(this.REFRESH_TOKEN_NAME);

    //             }
    //         }, complete: () => {
    //             // console.log('finished');
    //         }
    //     })

  }
  // let token = this.localStorageService.get(this.TOKEN_NAME);

  // console.log(`After: ${token}`);
  // let requestClone = originalRequest.clone(
  //     {
  //         setHeaders: {
  //             Authorization: `Bearer ${token}`
  //         }
  //     }
  // );

  // console.log(requestClone.headers.get('Authorization'));
  // switchMap(() => next(requestClone));


}
