import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: { name: string; email: string } | null = null;
  dropdownOpen = false;
  logoutModalVisible = false;
  searchQuery = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (res) => this.user = res.user,
      error: () => this.user = null,
    });
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown(): void {
    setTimeout(() => {
      this.dropdownOpen = false;
    }, 200);
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/dashboard'], { 
        queryParams: { q: this.searchQuery.trim() } 
      });
    }
  }

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
  dashboard() {
    this.router.navigate(['/dashboard']);
  }
}