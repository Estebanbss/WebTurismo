import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, orderBy, query, where } from '@angular/fire/firestore';
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

  //Todo: Método para traer los atractivos
  obtenerAtractivosPorMunicipio(nombreMunicipio: string): Observable<any> {
    // Creamos una referencia a la colección de la que queremos recibir los datos
    const municipioRef = collection(this.firestore, 'atractivos');

    // Usamos la función where para filtrar por el nombre del municipio
    const q = query(municipioRef, where('municipio', '==', nombreMunicipio));

    // Retornamos el observable
    return collectionData(q, { idField: 'id' }) as Observable<any>;
  }

  //Todo: Método para traer los Prestadore SIN espacios
  obtenerPrestadoresPorMunicipio(nombreMunicipio: string): Observable<any> {
    // Creamos una referencia a la colección de la que queremos recibir los datos
    const municipioRef = collection(this.firestore, 'prestadores');
    // Usamos la función where para filtrar por el nombre del municipio
    const q = query(municipioRef, where('municipio', '==', nombreMunicipio));

    // Retornamos el observable
    return collectionData(q, { idField: 'id' }) as Observable<any>;
  }

  //Todo: Método para traer los Prestadores CON espacio
  obtenerPrestadoresPorMunicipio2(nombreMunicipio: string): Observable<any> {
    // Creamos una referencia a la colección de la que queremos recibir los datos
    const municipioRef = collection(this.firestore, 'prestadores');
    // Usamos la función where para filtrar por el nombre del municipio
    const q = query(municipioRef, where('municipio', '==', `${nombreMunicipio} `));

    // Retornamos el observable
    return collectionData(q, { idField: 'id' }) as Observable<any>;
  }

}
