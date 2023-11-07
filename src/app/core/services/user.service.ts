
import { Injectable } from '@angular/core';
//Servicio de Firebase para la Autenticación
import { Auth, User, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, browserLocalPersistence, updateProfile  } from '@angular/fire/auth';
import { getFirestore, doc, setDoc, DocumentData, DocumentReference, getDoc, } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})



export class UserService {
  getDoc(docuRef: DocumentReference<DocumentData, DocumentData>) {
    throw new Error('Method not implemented.');
  }

  infoUsuario: any;

  //El Auth es nuestro servicio/Clase Firebase que nos mantiene actualizado el estado de nuestros usuarios en la app
  constructor(private auth: Auth) { }

  private rolSubject = new BehaviorSubject<string>("");
  rolSubject$ = this.rolSubject.asObservable();

  setRolSubject(value: string) {
    this.rolSubject.next(value);
  }

  firestore = getFirestore();



  // Crear un Nuevo Usuario
  async register(email:string, password:string) {
    // Vamos a retornar la promesa que nos da el método
    const infoUsuario = await createUserWithEmailAndPassword(this.auth, email, password);
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
