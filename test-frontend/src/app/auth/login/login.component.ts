import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
  };
  errorMassage: string = '';

  constructor(private authServices: AuthService, private router: Router) {}

  onLogin() {
    this.errorMassage = '';
    const { email, password } = this.loginData;
    this.authServices.login(email, password).subscribe({
      next: (res: any) => {
        const tocken = res.token;
        localStorage.setItem('token', tocken);
        this.router.navigate(['dashboard']); // Navigate to dashboard page after successful login

      },
      error: (err) => {
        this.errorMassage =
          err.error?.error || 'Login faild please try again';
      },
    });
  }
}
