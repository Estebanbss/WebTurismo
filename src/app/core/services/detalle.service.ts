import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  // Los objetos tienen una estructura diferente, usamos any para mayor flexibilidad
  private dataSource = new BehaviorSubject<any>(null);
  //Propiedad a la que nos suscribimos para obtener los datos
  currentData = this.dataSource.asObservable();

  constructor() { }

  // Método para cambiar el valor del objeto
  changeData(data: any) {
    this.dataSource.next(data);
  }
}
