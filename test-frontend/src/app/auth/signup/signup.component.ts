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
  signupData = { name: '',email: '', password: '' };
  successMessage = '';
  errorMessage = '';
  constructor(private authService: AuthService, private router: Router) {}

  onSignup() {
    this.successMessage = ''; 
    this.errorMessage = '';

    const { name, email, password } = this.signupData; // Fixed the variable name to 'name'

    this.authService.signUp(name, email, password).subscribe({
      next: (res: any) => {
        this.successMessage = 'Signup successful! Please log in.';
        this.signupData = {name:'', email: '', password: '' }; // Clear the form
        this.router.navigate(['/dashboard']); // Redirect to login page
      },
      error: (err) => {
        this.errorMessage =
          err.error?.error || 'Signup failed. Please try again.';
      },
    });
  }
}
