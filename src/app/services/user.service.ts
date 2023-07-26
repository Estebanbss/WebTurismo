import { Injectable } from '@angular/core';

//Servicio de Firebase para la Autenticación
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: Auth) { }

  // Crear un Nuevo Usuario
  register(email:string, password:string) {
    // Vamos a retornar la promesa que nos da el método
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  //Logear un Usuario
  login(email: string, password: string) {
    // Vamos a retornar la promesa que nos da el método
    return signInWithEmailAndPassword(this.auth, email, password);
  }

}
