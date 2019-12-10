import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {ConfigService} from '../../config.service';
import {Time} from '@angular/common';
import DateTimeFormat = Intl.DateTimeFormat;


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public redirectUrl: string;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(model: any) {
    const url = ConfigService.getApiUrl() + `/api/accounts`;
    return this.http.post<any>(url, model)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  forgot_password(model: any): Observable<any> {
    const url = ConfigService.getApiUrl() + `/api/accounts`;
    return this.http.post<any>(url, model);
  }

  register(model: any): Observable<any> {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    const url = ConfigService.getApiUrl() + `/api/accounts`;
    return this.http.put<any>(url, model);
  }
}

export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  token?: string;
}

export class UserDetails {
  username: string;
  email: string;
  tests: number;
  themes: number;
  time: string;
}
