import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  
  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
  }

  createContact(name: string, email: string, phone: string) {
    return this.http.post(`${environment.apiUrl}/api/contacts`, 
      { name, email, phone }, 
      this.getHeaders()
    );
  }

  getContacts() {
    return this.http.get(`${environment.apiUrl}/api/contacts`, this.getHeaders());
  }

  deleteContact(id: string) {
    return this.http.delete(`${environment.apiUrl}/api/contacts/${id}`, this.getHeaders());
  }

  getContactById(id: string): Observable<any> {
    
    return this.http.get(`${environment.apiUrl}/api/contacts/${id}`, this.getHeaders());
  }

  updateContact(id: string, name: string, email: string, phone: string) {
    return this.http.put(
      `${environment.apiUrl}/api/contacts/${id}`,
      { name, email, phone },
      this.getHeaders()
    );
  }
  
  
}