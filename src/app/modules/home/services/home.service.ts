import { Injectable } from '@angular/core';
import {Auth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private auth: Auth,) { }


  cerrarSesion() {
    //Método de Firebase para desloguear
    // return signOut(this.auth);
    return this.auth.signOut(); //Método de AngularFireAuth
  }



}
