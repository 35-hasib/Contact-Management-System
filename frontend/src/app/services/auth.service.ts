import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static isLoggedIn() {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient, private router: Router) {}

  SignUp(email: string, password: string) {
    const body = {
      email: email,
      password: password,
    };
    return this.http.post(`${environment.apiUrl}/api/signup`, body);
  }

  login(email: string, password: string) {
    const body = {
      email: email,
      password: password,
    };
    return this.http.post<{token: string}>(`${environment.apiUrl}/api/login`, body);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
