import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this._loggedIn.asObservable();

  // Contraseña simple para el admin (sin Supabase Auth)
  private readonly ADMIN_PASSWORD = 'cumple2026';

  constructor(private supabase: SupabaseService) {
    // Revisar si ya hay sesión guardada
    if (typeof sessionStorage !== 'undefined') {
      const saved = sessionStorage.getItem('admin_auth');
      if (saved === 'true') this._loggedIn.next(true);
    }
  }

  login(password: string): boolean {
    if (password === this.ADMIN_PASSWORD) {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('admin_auth', 'true');
      }
      this._loggedIn.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('admin_auth');
    }
    this._loggedIn.next(false);
  }

  isLoggedIn(): boolean {
    return this._loggedIn.value;
  }
}