import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ContactListComponent } from '../contact-list/contact-list.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent,RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
