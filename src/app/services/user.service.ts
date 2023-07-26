import { Injectable } from '@angular/core';

//Servicio de Firebase para la Autenticación
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: Auth) { }

  //Métodos Auth

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


  // Manejo de Errores Firebase
  firebaseError(code: string) {

    switch(code) {
      //Errors in Sign In Component
      case 'auth/email-already-in-use':
        return 'El usuario ya exíste';

      case 'auth/weak-password':
        return 'Contraseña muy debil';

      case 'auth/invalid-email':
        return 'Correo inválido';

      //Errors in Log In Component
      case 'auth/wrong-password':
        return 'La contraseña es Incorrecta';

      case 'auth/user-not-found':
        return 'El usuario no exíste';

      //Other Error
      default:
        return 'Error desconocido';
    }

  }


}
