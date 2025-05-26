import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { ContactItemComponent } from './components/contact-item/contact-item.component';
import { authGuard } from './guards/auth.guard';
import { ProfileComponent } from './auth/profile/profile.component';


export const appRoutes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent},
  { path: '', component: ContactListComponent},
  { path: 'add-contact', component: AddContactComponent}, 
  { path: '**', redirectTo: 'login' },
];
