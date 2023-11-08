import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Firestore,
  collection,
  collectionData,
  query,
  where
} from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  constructor(private firestore: Firestore) { }

  obtenerPrestador(item: any): Observable<any> {
    // Creamos una referencia a la colección de la que queremos recibir los datos
    const docRef = collection(this.firestore, `prestadores`);

    // Usamos la función where para filtrar por el nombre del prestador
    const q = query(docRef, where('name', '==', item));

    // Retornamos el observable
    return collectionData(q, { idField: 'id' }) as Observable<any>;
  }



}
