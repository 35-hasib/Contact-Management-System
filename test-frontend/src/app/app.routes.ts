import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { loginGuard } from './guards/login.guard';
import { SignupComponent } from './auth/signup/signup.component';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [loginGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] ,children: [
    {path: '', redirectTo: 'contact-list', pathMatch: 'full'},
    {path: 'contact-list', component: ContactListComponent, canActivate: [authGuard] },
    {path : 'add-contact', component: AddContactComponent, canActivate: [authGuard] },
    { path: 'edit-contact/:id', component: EditContactComponent, canActivate: [authGuard]},
    {path: 'contact-details/:id', component: ContactDetailsComponent, canActivate: [authGuard] },
  ]
},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' } 
];
