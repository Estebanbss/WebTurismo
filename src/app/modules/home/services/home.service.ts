import { Injectable } from '@angular/core';
import {Auth} from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  //? Propiedad para compartir el nombre del municipio que seleccione el usuario
  private sharingNombreMunicipio: BehaviorSubject<string> = new BehaviorSubject<string>('Garzón');

  constructor(private auth: Auth,) { }

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



}
