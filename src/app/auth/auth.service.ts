import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private uIsAuthenticated = true;
  private UserId = 'abc';

  get userIsAuthenticated() {
    return this.uIsAuthenticated;
  }
  get userId() {
    return this.UserId;
  }

  constructor() { }

  login() {
    this.uIsAuthenticated = true;
  }

  logout() {
    this.uIsAuthenticated = false;
  }
}
