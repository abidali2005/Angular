import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {

    if (username === 'admin' && password === '123') {
      localStorage.setItem('token', 'fake-token');
      localStorage.setItem('role', 'ADMIN');
      return true;
    }

    if (username === 'user' && password === '123') {
      localStorage.setItem('token', 'fake-token');
      localStorage.setItem('role', 'USER');
      return true;
    }

    return false;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}