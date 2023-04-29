import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  isAuthenticated() {
    const userToken = sessionStorage.getItem('currentUserToken');
    if (userToken == null || userToken == undefined)
      return false;
    return true;
  }

  login(email: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }
    const body = new HttpParams()
      .set('username', email)
      .set('password', password)

    return this.http
      .post<any>('http://localhost:8000/auth/login', body.toString(), httpOptions)
      .pipe(
        map((response) => {
          const now = new Date().getTime();
          sessionStorage.setItem('currentUserToken', JSON.stringify(response.access_token));
          return response;
        })
      );
  }
  
  signup(email: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }
    const body = new HttpParams()
      .set('username', email)
      .set('password', password)
    
    return this.http
      .post<any>('http://localhost:8000/auth/signup', body.toString(), httpOptions)
      .pipe(
        map((response) => {
          sessionStorage.setItem('currentUserToken', JSON.stringify(response.access_token));
          return response;
        })
      );
  }

  logout() {
    this.router.navigate(['/login']);
    sessionStorage.removeItem('currentUserToken');
  }
}
