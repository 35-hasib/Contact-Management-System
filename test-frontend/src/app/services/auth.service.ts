import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  constructor(private http: HttpClient, private router: Router) {}

  signUp(name: string, email: string, password: string) {
    const body = {
      name: name,
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
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
  getProfile() {
    const token = this.getToken();
    return this.http.get<{ user: { name: string; email: string } }>(
      `${environment.apiUrl}/api/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  
  
}
