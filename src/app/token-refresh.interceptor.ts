import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class TokenRefreshInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error.status === 401 && error.error.code === 'token_not_valid') {
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              const clonedRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${this.authService.getToken()}`
                }
              });
              return next.handle(clonedRequest);
            })
          );
        }
        return throwError(error);
      })
    );
  }
}
