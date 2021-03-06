import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private uIsAuthenticated = false;

  get userIsAuthenticated() {
    return this.uIsAuthenticated;
  }

  constructor() { }

  login() {
    this.uIsAuthenticated = true;
  }

  logout() {
    this.uIsAuthenticated = false;
  }
}
