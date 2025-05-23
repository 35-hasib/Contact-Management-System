import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from 'express';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule, NgIf],
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

        (this.router as any).navigate(['/profile']); // Fix: Added type assertion to access 'navigate' method on 'Router'.
      },
      error: (err) => {
        this.errorMassage =
          err.errors?.message || 'Login faild please try again';
      },
    });
  }
}
