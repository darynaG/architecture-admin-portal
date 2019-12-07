import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {tap, delay, map} from 'rxjs/operators';
import {ConfigService} from "../../config.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  isLoggedIn = false;

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  redirectUrl: string;

  login(model: any): Observable<any> {
    const url = ConfigService.getApiUrl() + `/api/accounts`;
    return this.http.post<any>(url, model)
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  register(model: any): Observable<any> {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    const url = ConfigService.getApiUrl() + `/api/accounts`;
    return this.http.put<any>(url, model);
  }

  forgot_password(model: any): Observable<any> {
    const url = ConfigService.getApiUrl() + `/api/accounts`;
    return this.http.post<any>(url, model);
  }

  getCurrentUser() {
    return {id: 1};
  }
}

export class User {
  id: number;
  username: string;
  password: string;
  token?: string;
}
