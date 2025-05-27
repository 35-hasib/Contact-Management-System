import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ContactsService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  isSearchMode = false;
  searchQuery = '';
  showDeleteModal = false;
  contactToDelete: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contactsService: ContactsService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      this.isSearchMode = !!this.searchQuery;
      this.loadContacts();
    });
  }

  loadContacts() {
    this.contactsService.getContacts().subscribe({
      next: (response: any) => {
        this.contacts = response.contacts.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        );
        this.filterContacts();
      },
      error: (err) => {
        console.error('Error loading contacts', err);
      }
    });
  }

  filterContacts() {
    if (!this.searchQuery) {
      this.filteredContacts = [...this.contacts];
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredContacts = this.contacts.filter(contact => 
      contact.name.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query) ||
      contact.phone.toLowerCase().includes(query)
    );
  }

  onSearch() {
    this.router.navigate(['/dashboard'], { 
      queryParams: { q: this.searchQuery.trim() },
      queryParamsHandling: 'merge' 
    });
  }

  clearSearch() {
    this.searchQuery = '';
    this.router.navigate(['/dashboard']);
  }

  createContact() {
    this.router.navigate(['dashboard/add-contact']);
  }

  tableClicked(contact: Contact, event: Event) {
    event.stopPropagation();
    this.router.navigate(['dashboard/contact-details', contact._id]);
  }

  editContact(contact: Contact, event: Event) {
    event.stopPropagation();
    this.router.navigate(['dashboard/edit-contact', contact._id]);
  }

  openDeleteModal(contactId: string, event: Event) {
    event.stopPropagation();
    this.contactToDelete = contactId;
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.contactToDelete = null;
  }

  confirmDelete() {
    if (this.contactToDelete) {
      this.contactsService.deleteContact(this.contactToDelete).subscribe({
        next: () => {
          this.contacts = this.contacts.filter(contact => contact._id !== this.contactToDelete);
          this.filterContacts();
          this.showDeleteModal = false;
          this.contactToDelete = null;
        },
        error: (err) => {
          console.error('Error deleting contact', err);
          this.showDeleteModal = false;
          this.contactToDelete = null;
        }
      });
    }
  }
}