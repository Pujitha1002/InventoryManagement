import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usernameSource = new BehaviorSubject<string>('Guest');
  username$ = this.usernameSource.asObservable();

  constructor() {
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
