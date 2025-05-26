import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AddContactComponent } from "../add-contact/add-contact.component";

@Component({
  selector: 'app-contact-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
  standalone: true,
})

export class ContactListComponent {
  contacts = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567'
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 (555) 987-6543'
    },
    {
      name: 'Hasibur Rahman',
      email: 'hasib@example.com',
      phone: '+8801571007636'
    },
    {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567'
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 (555) 987-6543'
    },
    {
      name: 'Hasibur Rahman',
      email: 'hasib@example.com',
      phone: '+8801571007636'
    },{
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567'
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 (555) 987-6543'
    },
    {
      name: 'Hasibur Rahman',
      email: 'hasib@example.com',
      phone: '+8801571007636'
    },{
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567'
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 (555) 987-6543'
    },
    {
      name: 'Hasibur Rahman',
      email: 'hasib@example.com',
      phone: '+8801571007636'
    },{
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567'
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 (555) 987-6543'
    },
    {
      name: 'Hasibur Rahman',
      email: 'hasib@example.com',
      phone: '+8801571007636'
    },{
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567'
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 (555) 987-6543'
    },
    {
      name: 'Hasibur Rahman',
      email: 'hasib@example.com',
      phone: '+8801571007636'
    },{
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567'
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 (555) 987-6543'
    },
    {
      name: 'Hasibur Rahman',
      email: 'hasib@example.com',
      phone: '+8801571007636'
    }
  ];
  constructor(private router: Router){}
  

  tableClicked(event: Event) {
    console.log('Table clicked:', event);
  }

  editContact(contact: any, event: Event) {
    event.stopPropagation();
    console.log('Editing contact:', contact);
  }

  deleteContact(phone: any, event: Event) {
    event.stopPropagation();
    console.log('Deleting contact:', phone);
  
    const target = event.target as HTMLElement;
    const row = target.closest("tr");
    if (row) {
      row.remove();
    }
    this.contacts = this.contacts.filter(contact => contact.phone !== phone);
  }
  
}
