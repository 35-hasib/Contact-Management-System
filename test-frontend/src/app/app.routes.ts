import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { loginGuard } from './guards/login.guard';
import { SignupComponent } from './auth/signup/signup.component';
import { authGuard } from './guards/auth.guard';
import { ProfileComponent } from './auth/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [loginGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  {path : 'add-contact', component: AddContactComponent, canActivate: [authGuard] },
  {path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' } 
];
