import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  password = '';
  error = false;

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    const ok = this.auth.login(this.password);
    if (ok) this.router.navigate(['/admin']);
    else this.error = true;
  }
}