import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: Auth) { }

  getLoggin(): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      onAuthStateChanged(this.afAuth, async (user) => {
        if (user) {

          const isVerified = await user.emailVerified;

          if (isVerified) {

            resolve(true);
          } else {
            resolve(false);
          }
        } else {
          resolve(false);
        }
      });
    });
  }
}
