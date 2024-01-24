import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService, LocalStorageService } from '../../services';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { IRefreshTokenRequest as IRefreshTokenRequest } from '../../models';
import { TokenType } from '../../assets';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export const RefreshTokenInterceptor: HttpInterceptorFn =
  (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const authService = inject(AuthService);
    const localStorageService = inject(LocalStorageService);
    const toastrService = inject(ToastrService);
    const router = inject(Router);

    let setHeaders = {
      'Authorization': '',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': '*',
      'Control-Allow-Origin': '*',
    };

    let token = localStorageService.get(authService.TOKEN_NAME);

    if (token)
      setHeaders.Authorization = `Bearer ${token}`;

    request = request.clone({
      setHeaders: setHeaders,
      withCredentials: false
    });

    function handle401Error(request: HttpRequest<any>, next: HttpHandlerFn) {
      let refreshToken = localStorageService.get(authService.REFRESH_TOKEN_NAME);

      let form = {
        refreshToken: refreshToken,
        TokenType: TokenType.refresh
      } as IRefreshTokenRequest;

      authService.refreshToken(form)
        .pipe(
          switchMap((response: any) => {
            localStorageService.set(authService.TOKEN_NAME, response.token);
            localStorageService.set(authService.REFRESH_TOKEN_NAME, response.refreshToken);
            localStorageService.set(authService.CALLED_NAME, response.calledName);

            return next(request);
          })
        )
        .subscribe((res) => {
          console.log(res);
        });

      return next(request);
    }

    return next(request)
      .pipe(
        catchError((error) => {

          if (error.error != null && error.error.status === 401) {
            localStorageService.delete(authService.TOKEN_NAME);
            localStorageService.delete(authService.REFRESH_TOKEN_NAME);
            localStorageService.delete(authService.CALLED_NAME);

            toastrService.error('Failed on refreshing token. Reauthenticate');
            router.navigate(['account', 'logout']);
            router.navigate(['account', 'login']);

            throw ('');
          } else if (error instanceof HttpErrorResponse && !request.url.includes('account/login') && error.status === 401) {
            handle401Error(request, next);
          }
          return throwError(() => error)
        })
      );
  };
