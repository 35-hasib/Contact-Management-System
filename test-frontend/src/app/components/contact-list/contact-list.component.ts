import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ContactsService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
  private searchSubject = new Subject<string>();

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

    // Setup real-time search with debounce
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchValue => {
      this.filterContacts();
      this.updateUrl();
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

  onSearchInput() {
    this.searchSubject.next(this.searchQuery);
  }

  filterContacts() {
    if (!this.searchQuery) {
      this.filteredContacts = [...this.contacts];
      this.isSearchMode = false;
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredContacts = this.contacts.filter(contact => 
      contact.name.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query) ||
      contact.phone.toLowerCase().includes(query)
    );
    this.isSearchMode = true;
  }

  updateUrl() {
    if (this.searchQuery.trim()) {
      this.router.navigate([], { 
        relativeTo: this.route,
        queryParams: { q: this.searchQuery.trim() },
        queryParamsHandling: 'merge'
      });
    } else {
      this.clearSearch();
    }
  }

  onSearch() {
    this.filterContacts();
    this.updateUrl();
  }

  clearSearch() {
    this.searchQuery = '';
    this.isSearchMode = false;
    this.filterContacts();
    this.router.navigate(['/dashboard'], { queryParams: { q: null }, queryParamsHandling: 'merge' });
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