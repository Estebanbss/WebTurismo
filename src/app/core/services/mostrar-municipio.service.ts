import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, limit, orderBy, query, startAfter, startAt, where } from '@angular/fire/firestore';
import { Observable, tap } from 'rxjs';

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
  } //? -> Fin del método obtener Municipios

  //Todo: Método para traer los atractivos SIN espacios
  obtenerAtractivosPorMunicipio(nombreMunicipio: string): Observable<any> {
    // Creamos una referencia a la colección de la que queremos recibir los datos
    const municipioRef = collection(this.firestore, 'atractivos');

    // Usamos la función where para filtrar por el nombre del municipio
    const q = query(municipioRef, where('municipio', '==', nombreMunicipio));

    // Retornamos el observable
    return collectionData(q, { idField: 'id' }) as Observable<any>;
  }

  //Todo: Método para traer los atractivos CON espacio
  obtenerAtractivosPorMunicipio2(nombreMunicipio: string): Observable<any> {
    // Creamos una referencia a la colección de la que queremos recibir los datos
    const municipioRef = collection(this.firestore, 'atractivos');

    // Usamos la función where para filtrar por el nombre del municipio
    const q = query(municipioRef, where('municipio', '==', `${nombreMunicipio} `));

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

  //? SECCIÓN DE LEER PERO PARA EL MÓDULO DE BUSQUEDA PRESTADOR

    // Método para obtener los documentos con paginación
    obtenerPrestadoresPaginacionUno(): Observable<any> {
      const prestadoresRef = collection(this.firestore, 'prestadores');

      let q = query(prestadoresRef, orderBy('id'), limit(10));

      return collectionData(q, { idField: 'id' }) as Observable<any>;
    }

    // Método para obtener los documentos con paginación
    obtenerPrestadoresPaginacion(paginaSiguiente: boolean, ultimoDocumento: any): Observable<any> {
      const prestadoresRef = collection(this.firestore, 'prestadores');

      let q;
      if (paginaSiguiente && ultimoDocumento) {
        q = query(prestadoresRef, orderBy('id'), startAfter(ultimoDocumento.id), limit(10));
      } else {
        q = query(prestadoresRef, orderBy('id'), limit(10));
      }

      return collectionData(q, { idField: 'id' }) as Observable<any>;
    }

    //? SECCIÓN DE LEER PERO PARA EL MÓDULO DE BUSQUEDA ATRACTIVO

    // Método para obtener los documentos con paginación
    obtenerAtractivosPaginacionUno(): Observable<any> {
      const prestadoresRef = collection(this.firestore, 'atractivos');

      let q = query(prestadoresRef, orderBy('id'), limit(10));

      return collectionData(q, { idField: 'id' }) as Observable<any>;
    }

    // Método para obtener los documentos con paginación
    obtenerAtractivosPaginacion(paginaSiguiente: boolean, ultimoDocumento: any): Observable<any> {
      const prestadoresRef = collection(this.firestore, 'atractivos');

      let q;
      if (paginaSiguiente && ultimoDocumento) {
        q = query(prestadoresRef, orderBy('id'), startAfter(ultimoDocumento.id), limit(10));
      } else {
        q = query(prestadoresRef, orderBy('id'), limit(10));
      }

      return collectionData(q, { idField: 'id' }) as Observable<any>;
    }

    obtenerAtractivosPorArreglodeID(arregloID: string[]): Observable<any> {
      const atractivosRef = collection(this.firestore, 'atractivos');

      let q = query(atractivosRef, where('id', 'in', arregloID));

      return collectionData(q, { idField: 'id' }) as Observable<any>;
     }

    obtenerPrestadoresPorArreglodeID(arregloID: string[]): Observable<any> {
      const prestadoresRef = collection(this.firestore, 'prestadores');

      let q = query(prestadoresRef, where('id', 'in', arregloID));

      return collectionData(q, { idField: 'id' }) as Observable<any>;
     }

}
