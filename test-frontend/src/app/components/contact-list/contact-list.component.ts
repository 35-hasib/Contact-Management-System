import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddContactComponent } from "../add-contact/add-contact.component";

@Component({
  selector: 'app-contact-list',
  imports: [CommonModule, AddContactComponent],
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
  showPopup: boolean | undefined;
  constructor(private router: Router){}
  createContact() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  tableClicked(event: Event) {
    // Optional handler if needed
  }

  editContact(contact: any, event: Event) {
    event.stopPropagation();
    // Logic for editing
  }

  deleteContact(contact: any, event: Event) {
    event.stopPropagation();
    // Logic for deleting
  }
}
