
import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class MessagesService {

  constructor(private firestore: Firestore) { }

  async obtenerTodosLosMensajes(): Promise<Observable<any>> {
    // Creamos una referencia a la colección de la que queremos recibir los datos
    const docRef = collection(this.firestore, 'mail');

    // Obtenemos los datos de la colección y los almacenamos en una variable
    const data = await collectionData(docRef, { idField: 'id' });

    // Retornamos los datos como un Observable
    return data;
  }

  async obtenerTodosLosMensajeLeidos(): Promise<Observable<any>> {
    // Creamos una referencia a la colección de la que queremos recibir los datos
    const docRef = collection(this.firestore, 'mailRead');

    // Obtenemos los datos de la colección y los almacenamos en una variable
    const data = await collectionData(docRef, { idField: 'id' });

    // Retornamos los datos como un Observable
    return data;
  }
  leerMensaje(id: string): void {
    // Creamos una referencia al documento que queremos mover
    const docRef = doc(this.firestore, `mail/${id}`); // Movemos por id

    getDoc(docRef).then((doc) => {
      if (doc.exists()) {
        console.log("Readed!", doc.data());
        addDoc(collection(this.firestore, 'mailRead'), doc.data())
          .then(() => {
            // Después de copiar el documento a 'mailRead', podemos eliminarlo
            deleteDoc(docRef).then(() => {
              console.log("Documento eliminado correctamente");
            }).catch((error) => {
              console.error("Error al eliminar el documento:", error);
            });
          })
          .catch((error) => {
            console.error("Error al copiar el documento a 'mailRead':", error);
          });
      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.error("Error al obtener el documento:", error);
    });
  } // Fin de la función leerMensaje



}
