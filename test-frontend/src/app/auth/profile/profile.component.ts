// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  user: { name: string; email: string } | null = null;
  errorMessage = '';

  constructor(private authService: AuthService , private router: Router) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (res) => {
        this.user = res.user;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load profile';
        console.error(err);
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  logoutModalVisible = false;

showLogoutModal() {
  this.logoutModalVisible = true;
}

confirmLogout() {
  this.logoutModalVisible = false;
  this.authService.logout();
  this.router.navigate(['/login']);
}

cancelLogout() {
  this.logoutModalVisible = false;
}
showModal = false;

}
