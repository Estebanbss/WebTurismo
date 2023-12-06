import { Injectable } from '@angular/core';
import {Auth} from '@angular/fire/auth';
import { Firestore, addDoc, collection, doc, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  //? Propiedad para compartir el nombre del municipio que seleccione el usuario
  private sharingNombreMunicipio: BehaviorSubject<string> = new BehaviorSubject<string>('Garzón');

  constructor(private auth: Auth,
              private firestore: Firestore) {

   }

  //? SECCIÓN COMPARTIR INFORMACIÓN

  //? Métodos para compartir información entre componentes por Observable

  //? Nos suscribimos a éste método para obtener los datos que tiene el observable
  get sharingHomeMunicipio() {
    return this.sharingNombreMunicipio.asObservable();
  }

  //? Cambiamos la Información al observable
  set sendHomeMunicipioData(newValue: string ) {
    this.sharingNombreMunicipio.next(newValue);
  }

  //? SECCIÓN CERRAR SESIÓN
  cerrarSesion() {
    //Método de Firebase para desloguear
    // return signOut(this.auth);
    return this.auth.signOut(); //Método de AngularFireAuth
  }

  addMail(mail: any): Promise<any> {
    //? CARGA DE DATOS A FIRESTORE
    //Creamos una referencia a la colleción
    const mailRef = collection(this.firestore, 'mail'); // Servicio y nombre de la colección
    //Añadimos en un documento la referencia y los datos que lo componen
    return addDoc(mailRef, mail); // Retorna una Promesa
  }

  atractivoMeGusta(item: any): Promise<void> {
    const docRef = doc(this.firestore,`atractivos/${item.id}`); //Actualizamos por id
    return updateDoc(docRef, item);
  }

  prestadorMeGusta(item: any): Promise<void> {
    const docRef = doc(this.firestore,`prestadores/${item.id}`); //Actualizamos por id
    return updateDoc(docRef, item);
  }

}
