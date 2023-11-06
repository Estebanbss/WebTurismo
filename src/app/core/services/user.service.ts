
import { Injectable } from '@angular/core';
//Servicio de Firebase para la Autenticación
import { Auth, User, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, browserLocalPersistence, updateProfile  } from '@angular/fire/auth';
import { getFirestore, doc, setDoc, } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})



export class UserService {

  infoUsuario: any;

  //El Auth es nuestro servicio/Clase Firebase que nos mantiene actualizado el estado de nuestros usuarios en la app
  constructor(private auth: Auth) { }

  firestore = getFirestore();

  generateRandom9DigitNumber() {
    const min = 100000000; // El valor mínimo de 9 dígitos
    const max = 999999999; // El valor máximo de 9 dígitos
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  }

  // Crear un Nuevo Usuario
  async register(email:string, password:string) {
    // Vamos a retornar la promesa que nos da el método
    const infoUsuario = await createUserWithEmailAndPassword(this.auth, email, password);
    const random9DigitNumber = this.generateRandom9DigitNumber();
    const docuRef = doc(this.firestore, `users/${infoUsuario.user.uid}`)

    setDoc(docuRef, {
      correo: infoUsuario.user.email,
      rol: 'usuario',
      nombre: infoUsuario.user.displayName,
      userName: `${infoUsuario.user.displayName}${random9DigitNumber}`,
      fotoUser: infoUsuario.user.photoURL,
      uid: infoUsuario.user.uid,
      estado: infoUsuario.user.emailVerified,
      fechaCreacion: new Date(infoUsuario.user.metadata.creationTime!).toISOString(),
      fechaUltimoLogin: new Date(infoUsuario.user.metadata.lastSignInTime!).toISOString(),
      numeroTel: infoUsuario.user.phoneNumber
    });
    return infoUsuario;
  }

  //Logear un Usuario
  login(email: string, password: string) {

    // Vamos a retornar la promesa que nos da el método
    return this.auth.setPersistence(browserLocalPersistence).then(()=>{

      this.infoUsuario = signInWithEmailAndPassword(this.auth, email, password);
      return this.infoUsuario;


    })

  }

  getCurrentUser(auth:any) {
    return new Promise((resolve, reject) => {
       const unsubscribe = auth.onAuthStateChanged((user: any) => {
          unsubscribe();
          resolve(user);
       }, reject);
    });
  }

  update(){
    const docuRef = doc(this.firestore, `users/${this.auth.currentUser!.uid}`)
    // updateProfile(this.auth.currentUser!,{}).then(()=>{ }).catch((error)=>{console.log(error)})
    return setDoc(docuRef,{ fechaUltimoLogin: new Date().toISOString()}, {merge: true})
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
    return this.auth.signOut();
  }


  //LogIn con el servicio de Google
  loginConGoogle() {

    return this.auth.setPersistence(browserLocalPersistence).then(()=>{
     const infoUsuario = signInWithPopup(this.auth, new GoogleAuthProvider());
    return infoUsuario;

    })

    // Llamámos a la función de Popup y le pasamos el servico auth y un objeto Provider de Google

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
