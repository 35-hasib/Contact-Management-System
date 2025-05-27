import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactsService } from '../../services/contact.service';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.css',
  imports: [CommonModule, FormsModule],
})
export class EditContactComponent implements OnInit {
  contactId = '';
  contact = {
    name: '',
    phone: '',
    email: '',
    notes: '',
  };
  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.contactId = this.route.snapshot.paramMap.get('id') || '';

    this.contactsService.getContactById(this.contactId).subscribe({
      next: (response: any) => {
        this.contact = response.contact;
      },
      error: (err) => {
        console.error('Error loading contact', err);
        this.errorMessage = 'Failed to load contact';
      },
    });
    
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.isLoading = true;
    this.contactsService
      .updateContact(
        this.contactId,
        this.contact.name,
        this.contact.email,
        this.contact.phone,
        this.contact.notes
      )
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'Failed to update contact';
        },
      });
  }

  onCancel() {
    this.router.navigate(['/dashboard']);
  }
}
