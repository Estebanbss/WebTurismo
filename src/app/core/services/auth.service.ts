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
        // console.log("Bienvenido!", user?.displayName, "tu email: ", user?.email, "tu numero telefonico:" , user?.phoneNumber, "tu foto de perfil: ", user?.photoURL, "tu uid: ", user?.uid)
        if (user != null || user != undefined) {
          resolve(true);

        } else {
          resolve(false);

        }
      });
    });
  }
}
