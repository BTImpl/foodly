import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  constructor(public authService: AuthService) { }

  loginWithGoogle() {
    this.authService.googleSignin();
  }

  logout() {
    this.authService.signOut();
  }
}
