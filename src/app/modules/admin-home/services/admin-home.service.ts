import { Injectable } from '@angular/core';
import {Auth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AdminHomeService {

  constructor(private auth: Auth,){}

  usuarioActual() {
    // Esta propiedad nos retorna el usuario (si hay) que está logeado actualmente desde la app
    return this.auth.currentUser;
  }

}
