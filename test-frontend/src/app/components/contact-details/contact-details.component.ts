import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContactsService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.css',
  imports: [CommonModule],
})
export class ContactDetailsComponent implements OnInit {
  contactId = '';
  contact: any = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contactId = this.route.snapshot.paramMap.get('id') || '';
    this.isLoading = true;

    this.contactsService.getContactById(this.contactId).subscribe({
      next: (response: any) => {
        this.contact = response.contact;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading contact details', err);
        this.errorMessage = 'Failed to load contact details';
        this.isLoading = false;
      },
    });
  }

  onBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
