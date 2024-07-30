import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { SERVER_URL } from '../config';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isAuthenticatedSource = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSource.asObservable();

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  registerUser(user: any) {
    return this.http.post(`${SERVER_URL}/auth/register`, user)
  }

  loginUser(user: any) {
    this.login()
    return this.http.post(`${SERVER_URL}/auth/login`, user)
  }

  logoutUser() {
    this.logout()
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.get(`${SERVER_URL}/auth/auth-check`, {headers: headers})
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    } else {
      return null
    }
  }

  getUser(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('user');
    } else {
      return null
    }
  }

  login() {
    // Handle login logic
    this.isAuthenticatedSource.next(true); // Update authentication state
  }

  logout() {
    // Handle logout logic
    this.isAuthenticatedSource.next(false); // Update authentication state
  }
}
