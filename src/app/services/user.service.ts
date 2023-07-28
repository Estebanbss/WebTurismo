import { Injectable } from '@angular/core';

//Servicio de Firebase para la Autenticación
import { Auth, User, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //El Auth es nuestro servicio/Clase Firebase que nos mantiene actualizado el estado de nuestros usuarios en la app
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
    return this.auth.signOut();
  }

  //Comprobar usuario Actual
  usuarioActual() {
    // Esta propiedad nos retorna el usuario (si hay) que está logeado actualmente desde la app
    return this.auth.currentUser;
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
