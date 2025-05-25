import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { ContactItemComponent } from './components/contact-item/contact-item.component';


export const appRoutes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'contact-item', component: ContactItemComponent, children: [
    { path: '', redirectTo: 'add-contact', pathMatch: 'full' },
    { path: 'add-contact', component: AddContactComponent }
  ]},
  { path: '**', redirectTo: 'login' },
];
