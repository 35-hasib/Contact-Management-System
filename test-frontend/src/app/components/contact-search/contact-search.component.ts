import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-search',
  imports: [CommonModule],
  templateUrl: './contact-search.component.html',
  styleUrl: './contact-search.component.css'
})
export class ContactSearchComponent {
  searchQuery: string = '';
  
}
