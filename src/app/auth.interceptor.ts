import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { APIURL } from 'src';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the token from local storage
    const token = localStorage.getItem('token');

    // Clone the request and add the authorization header if the token exists
    let clonedRequest = req;
    if (token) {
      clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(clonedRequest).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          console.log('---> status:', evt.status);
          console.log('---> filter:', req.params.get('filter'));
        }
      }),
      catchError((error) => {
        console.error('Request failed:', error);
        return throwError(error);
      })
    );
  }
}
