import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ContactsService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css'
})
export class AddContactComponent {
  contact = {
    name: '',
    phone: '',
    email: '',
    notes: ''
  };
  isLoading = false;
  errorMessage = '';

  constructor(
    private contactsService: ContactsService,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const { name, phone, email, notes } = this.contact;

    this.contactsService.createContact(name, email, phone, notes).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/dashboard'],);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Failed to create contact';
        console.error('Error creating contact', err);
      }
    });
  }

  onCancel() {
    this.router.navigate(['/dashboard']);
  }
}