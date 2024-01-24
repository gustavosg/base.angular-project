import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, concatMap, delay, of, retryWhen } from 'rxjs';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

export class HttpUtil {

  static apiUrl: string = environment.apiURL;
  static apiUrlVersion: string = environment.apiVersion;
  static toastrService: ToastrService;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private toastrService: ToastrService
  ) {
    this.toastrService = toastrService;

  }

  static constructUrl(url: string, pathIds?: Record<string, number>[]) {
    return this.apiUrl + this.apiUrlVersion + "/" + url
  };

  static handleRetryError(delayTime: number): any {
    let retries = 0;
    let exceedAttemptLimit = 3;

    return retryWhen(error => {
      return error.pipe(
        delay(delayTime),
        concatMap((error) => {


          retries = retries + 1;
          if (retries < exceedAttemptLimit) {

            return of(error);
          } else {
            throw error;
          }
        })
      );
    });
  };

//   getAsync(requestUrl: string, params?: object): Observable<any> {

  //     let url: string = this.apiUrl + requestUrl;

  //     if (params != null)
  //       url = url + JSON.stringify(params);

  //     return this.http.get(url, this.httpOptions)
  //       .pipe(
  //         catchError((err) => {
  //           this.handleError(requestUrl, err);
  //           throw err;
  //         }
  //         ))
  //       ;
  //   }

  //   postAsync(requestUrl: string, body: any): Observable<any> {
  //     return this.http.post
  //       (this.constructUrl(requestUrl), JSON.stringify(body), this.httpOptions)
  //       .pipe(
  //         catchError((err) => {
  //           this.handleError(requestUrl, body, err);
  //           throw err;
  //         }
  //         ))
  //       ;
  //   }


  //   putAsync(requestUrl: string, pathIds: Record<string, number>[], body: any): Observable<any> {

  //     return this.http.put
  //       (this.constructUrl(requestUrl, pathIds), JSON.stringify(body), this.httpOptions)
  //       .pipe(catchError((err) => {
  //         this.handleError('put', body, err);
  //         throw err;
  //       }
  //       ))
  //   }

  // handleError<TResult>(arg0: string, body: any): (err: any, caught: Observable<TResult>) => import("rxjs").ObservableInput<any> {
  //   console.error(`Error when calling ${arg0}: ${JSON.stringify(body)} `);
  // }

  // handleError(arg0: string, body: any): {
  //   console.error(`Error when calling ${arg0}: ${JSON.stringify(body)} `);
  // }

}
