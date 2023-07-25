import { Injectable } from '@angular/core';

//Servicio de Firebase para la Autenticación
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: Auth) { }

  // Crear un Nuevo Usuario
  register({email, password}:any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

}
