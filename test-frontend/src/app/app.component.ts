import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import { AddContactComponent } from "./components/add-contact/add-contact.component";
import { ContactSearchComponent } from "./components/contact-search/contact-search.component";
import { ContactListComponent } from "./components/contact-list/contact-list.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test-frontend';
}
