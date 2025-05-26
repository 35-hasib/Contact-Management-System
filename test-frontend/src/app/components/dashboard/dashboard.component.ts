import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ContactListComponent } from "../contact-list/contact-list.component";

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, ContactListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
