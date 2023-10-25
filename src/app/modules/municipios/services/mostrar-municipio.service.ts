import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, orderBy, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MostrarMunicipioService {

  constructor(
    private firestore: Firestore
  ) { }

  //? SECCIÓN LEER

  //? -> Creamos un método para obtener los datos de una colección
  //Read - R
  obtenerMunicipios(): Observable<any> {
    // Creamos una referencia a la colección de la que queremos recibir los datos
    const municipioRef = collection(this.firestore, 'municipios'); // Servicio y nombre de la colección

    //Ordenamos los datos que queremos traer de la colleción usando orderBy y limit en un query
    //El query nos sirve para organizar los datos que queremos traer de la BD
    const q = query(municipioRef, orderBy('name', 'asc'));

    //Retornamos el observable que nos devuelve una función anónima a la que nos debemos suscribir y en la que recibimos los datos solicitados de la colección
    return collectionData(q, { idField: 'id' }) as Observable<any>;
  } //? -> Fin del método obtener Prestador


}
