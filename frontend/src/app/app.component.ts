import { Component , inject} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule,RouterModule],
  template: `<router-outlet></roputer-outlet>`,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  authService = inject(LoginComponent);
  title = 'frontend';
}
