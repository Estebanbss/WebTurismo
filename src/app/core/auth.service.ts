import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: Auth) { }

  getLoggin(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      onAuthStateChanged(this.afAuth, (user) => {
        if (user !== null || user !== undefined) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}
