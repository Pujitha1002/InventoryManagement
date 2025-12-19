import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // BehaviorSubject holds the current username and allows subscription
  private usernameSource = new BehaviorSubject<string>('Guest');
  username$ = this.usernameSource.asObservable();

  constructor() {
    // Load from localStorage if available
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      this.usernameSource.next(storedUser);
    }
  }

  setUsername(name: string) {
    localStorage.setItem('username', name);
    this.usernameSource.next(name);
  }

  clearUsername() {
    localStorage.removeItem('username');
    this.usernameSource.next('Guest');
  }
}
