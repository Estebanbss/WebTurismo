import { Injectable } from '@angular/core';
import algoliasearch from 'algoliasearch/lite';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  /*Credenciales Algolia*/
  private applicationID = 'EGSCCYSL0C';
  private searchOnlyAPIKey = '1fe452840ab7d65e2eaba1251694a41f';
  private indiceDeAlgolia = 'prestadores_index';

  constructor() { }

  //Configuración de Algolia, cliente e Indice
  private client = algoliasearch(this.applicationID, this.searchOnlyAPIKey);
  private index = this.client.initIndex(this.indiceDeAlgolia);

  //Método que utilizamos para las búsquedas
  public search(query: string): Promise<any> {
    return this.index.search(query);
  }

}
