import { Injectable } from '@angular/core';
import {Auth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private auth: Auth,) { }

   usuarioActual() {
    // Esta propiedad nos retorna el usuario (si hay) que está logeado actualmente desde la app
    return this.auth.currentUser;
  }

  cerrarSesion() {
    //Método de Firebase para desloguear
    // return signOut(this.auth);
    return this.auth.signOut(); //Método de AngularFireAuth
  }

}
