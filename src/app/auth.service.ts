import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/token/';
  private refreshTokenUrl = 'http://127.0.0.1:8000/api/token/refresh/';
  private signupUrl = 'http://127.0.0.1:8000/api/signup/';
  private baseUrl = 'http://127.0.0.1:8000/api/';
  private usersUrl = 'http://127.0.0.1:8000/api/users/';

  private tokenKey = 'auth_token';
  private refreshTokenKey = 'refresh_token';

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.access);
        localStorage.setItem(this.refreshTokenKey, response.refresh);
      }),
      catchError(this.handleError)
    );
  }

  signup(user: any): Observable<any> {
    return this.http.post(`${this.signupUrl}`, user).pipe(
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  private handleError(error: any): Observable<never> {
    return throwError(error.message || 'Error occurred');
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey) || '';
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.refreshTokenKey) || '';
  }

  refreshToken(): Observable<any> {
    return this.http.post<any>(this.refreshTokenUrl, { refresh: this.getRefreshToken() }).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.access);
      }),
      catchError(this.handleError)
    );
  }
}
