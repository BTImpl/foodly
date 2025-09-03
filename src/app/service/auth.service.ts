import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, User } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private auth: Auth) {
    this.auth.onAuthStateChanged(user => {
      this.userSubject.next(user);
    });
  }

  async googleSignin() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      console.log('Sikeres bejelentkezés', result.user);
    } catch (error) {
      console.error('Hiba a bejelentkezés során', error);
    }
  }

  async signOut() {
    try {
      await signOut(this.auth);
      console.log('Sikeres kijelentkezés');
    } catch (error) {
      console.error('Hiba a kijelentkezés során', error);
    }
  }
}
