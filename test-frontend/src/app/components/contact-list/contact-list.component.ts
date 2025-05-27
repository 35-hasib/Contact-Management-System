import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ContactsService } from '../../services/contact.service'; 
import { Contact } from '../../models/contact.model'; 

@Component({
  selector: 'app-contact-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
  standalone: true,
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(
    private router: Router,
    private contactsService: ContactsService
  ) {}

  ngOnInit() {
    this.loadContacts();
  }
  
  loadContacts() {
    this.contactsService.getContacts().subscribe({
      next: (response: any) => {
        this.contacts = response.contacts.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        );
      },
      error: (err) => {
        console.error('Error loading contacts', err);
      }
    });
  }
  

  tableClicked(contact: Contact,event: Event) {
    console.log('Table clicked:', event);
    event.stopPropagation(); // Prevent event bubbling if needed
    this.router.navigate(['/contact-details', contact._id]);
  }

  editContact(contact: Contact, event: Event) {
    event.stopPropagation();
    this.router.navigate(['/edit-contact', contact._id]);
  }

  deleteContact(contactId: string, event: Event) {
    event.stopPropagation();
    
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactsService.deleteContact(contactId).subscribe({
        next: () => {
          this.contacts = this.contacts.filter(contact => contact._id !== contactId);
        },
        error: (err) => {
          console.error('Error deleting contact', err);
        }
      });
    }
  }
}