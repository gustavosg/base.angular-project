import { Injectable } from '@angular/core';
import { IRegisterRequest, IRegisterResponse } from '../../models';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpUtil } from '../../utils/http.utils';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  register(body: IRegisterRequest): Observable<any> {

    let url = HttpUtil.constructUrl('account/register');

    return this.http.post(url, body).pipe(catchError((err) => {
      throw err;
    }));
  }

}
