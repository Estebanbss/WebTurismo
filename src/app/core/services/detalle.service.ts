import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
  getDocs,
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

  async obtenerPrestadoresAleatorios(cantidad: number, municipio?: string): Promise<any[]> {
    // Referencia a la colección
    const docRef = collection(this.firestore, 'prestadores');

    // Crear la consulta en función de si se proporcionó el municipio
    let q;
    if (municipio) {
      q = query(docRef, where('municipio', '==', municipio));
    } else {
      q = query(docRef); // Consulta sin filtro si no se especifica municipio
    }

    // Obtener los documentos según la consulta
    const snapshot = await getDocs(q);
    const documentosFiltrados = snapshot.docs.map(doc => doc.id);

    // Seleccionar IDs aleatoriamente entre los documentos filtrados
    const idsSeleccionados = this.seleccionarAleatoriamente(documentosFiltrados, cantidad);

    // Recuperar los documentos completos
    const promesas = idsSeleccionados.map(id => this.obtenerDocumentoPorID(docRef, id));
    return Promise.all(promesas);
  }


async obtenerAtractivosAleatorios(cantidad: number, municipio?: string): Promise<any[]> {
  // Referencia a la colección
  const docRef = collection(this.firestore, 'atractivos');

  // Crear la consulta en función de si se proporcionó el municipio
  let q;
  if (municipio) {
    q = query(docRef, where('municipio', '==', municipio));
  } else {
    q = query(docRef); // Consulta sin filtro si no se especifica municipio
  }

  // Obtener los documentos según la consulta
  const snapshot = await getDocs(q);
  const documentosFiltrados = snapshot.docs.map(doc => doc.id);

  // Seleccionar IDs aleatoriamente entre los documentos filtrados
  const idsSeleccionados = this.seleccionarAleatoriamente(documentosFiltrados, cantidad);

  // Recuperar los documentos completos
  const promesas = idsSeleccionados.map(id => this.obtenerDocumentoPorID(docRef, id));
  return Promise.all(promesas);
}

  seleccionarAleatoriamente(arr: string | any[], n: number) {
    let resultado = new Set();
    while (resultado.size < n) {
      let aleatorio = arr[Math.floor(Math.random() * arr.length)];
      resultado.add(aleatorio);
    }
    return Array.from(resultado);
  }


  async obtenerDocumentoPorID(docRef: CollectionReference<DocumentData, DocumentData>, id: unknown) {
    const docSnap = await getDoc(doc(docRef, id as string));
    return docSnap.data();
  }

}
