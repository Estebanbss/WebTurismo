
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//Servicio de Firebase para la Autenticación
import { Auth, User, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,  } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})



export class UserService {


  //El Auth es nuestro servicio/Clase Firebase que nos mantiene actualizado el estado de nuestros usuarios en la app
  constructor(private auth: Auth, private router: Router) { }


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

  // Recuperar Usuario
  recuperar(email: string) {
    //El método de Firebase se encarga de enviar un correo
    return sendPasswordResetEmail(this.auth, email);
  }

  //Verificación de Correo
  verificarCorreo(user: User) {
    // Método de Firebase que se encarga de enviar un correo para verificar cuenta
    sendEmailVerification(user);
  }

  //LogOut o Cerrar Sesión
  cerrarSesion() {
    //Método de Firebase para desloguear
    // return signOut(this.auth);
    return this.auth.signOut();
  }


  //LogIn con el servicio de Google
  loginConGoogle() {
    // Llamámos a la función de Popup y le pasamos el servico auth y un objeto Provider de Google
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  // Manejo de Errores Firebase
  firebaseError(code: string) {

    switch(code) {
      //Errors El usuario ya exíste
      case 'auth/email-already-in-use':
        return 'El usuario ya exíste';

      //Error Contraseña muy debil
      case 'auth/weak-password':
        return 'Contraseña muy debil';

      //Error Correo inválido
      case 'auth/invalid-email':
        return 'Correo inválido';

      //Errors La contraseña es Incorrecta
      case 'auth/wrong-password':
        return 'La contraseña es Incorrecta';

      //Error El usuario no exíste
      case 'auth/user-not-found':
        return 'El usuario no exíste';

      //Other Error
      default:
        return 'Error desconocido';
    }

  }


}
