import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
})
export class NavbarComponent {
  isMobileMenuOpen = false;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.isMobileMenuOpen = false;
  }
}