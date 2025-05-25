import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ContactService {

    constructor(private http: HttpClient) {}
    
    addContact(name: string, phone: string, email: string) {
        const body = {
        name: name,
        email: email,
        phone: phone,
        };
        return this.http.post(`${environment.apiUrl}/api/contacts`, body);
    }
    
    getContacts() {
        return this.http.get(`${environment.apiUrl}/api/contacts`);
    }
    
    deleteContact(id: string) {
        return this.http.delete(`${environment.apiUrl}/api/contacts/${id}`);
    }
    
    searchContacts(query: string) {
        return this.http.get(`${environment.apiUrl}/api/contacts/search?query=${query}`);
    }
}
