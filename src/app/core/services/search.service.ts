import { Injectable } from '@angular/core';
import algoliasearch from 'algoliasearch/lite';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  /*Credenciales Algolia de Pal'Huila*/
  private applicationID = 'EGSCCYSL0C';
  private searchOnlyAPIKey = '1fe452840ab7d65e2eaba1251694a41f';

  //*Indice de los prestadores de Algolia
  private indiceDeAlgolia = 'prestadores_index';

  //*Indice de los atractivos de Algolia
  private indiceDeAlgolia2 = 'atractivos_index';

  constructor() { }

  //*Cliente de Algolia - Cuenta Pal'Huila
  private client = algoliasearch(this.applicationID, this.searchOnlyAPIKey);

  //* PRESTADORES
  //*Configuración de Algolia, Indice para Prestadores
  private index = this.client.initIndex(this.indiceDeAlgolia);

  //?Método que utilizamos para las búsquedas de Prestadores
  public search(query: string): Promise<any> {
    return this.index.search(query);
  }

  //* ATRACTIVOS
  //*Configuración de Algolia, Indice para Atractivos
  private index2 = this.client.initIndex(this.indiceDeAlgolia2);

  //?Método que utilizamos para las búsquedas de Atractivos
  public search2(query: string): Promise<any> {
    return this.index2.search(query);
  }

}
