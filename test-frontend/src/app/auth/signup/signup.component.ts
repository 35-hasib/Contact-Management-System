import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  standalone: true,
})
export class SignupComponent {
  signupData = { email: '', password: '' };
  successMessage = '';
  errorMessage = '';
  constructor(private authService: AuthService, private router: Router) {}

  onSignup() {
    this.successMessage = ''; 
    this.errorMessage = '';

    const { email, password } = this.signupData;

    this.authService.signUp(email, password).subscribe({
      next: (res: any) => {
        this.successMessage = 'Signup successful! Please log in.';
        this.signupData = { email: '', password: '' }; // Clear the form
        this.router.navigate(['/login']); // Redirect to login page
      },
      error: (err) => {
        this.errorMessage =
          err.error?.message || 'Signup failed. Please try again.';
      },
    });
  }
}
