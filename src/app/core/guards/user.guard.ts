import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private firestore: Firestore, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const user = route.paramMap.get('id');

    // Creamos una consulta a Firestore
    const prestadoresRef = collection(this.firestore, "users");
    const q = query(prestadoresRef, where('userName', '==', user));

    // Devolvemos una promesa que resuelve a un booleano
    return getDocs(q).then(querySnapshot => {
      console.log(q)
      // Si al menos un documento existe, devuelve true, de lo contrario false
      if(querySnapshot.empty){
        this.router.navigate(['/home']);
        console.log("No está");
      }
      return !querySnapshot.empty;
    }).catch(error => {
      // Manejo de errores, en caso de error devolvemos false
      console.error("No está", error);
      return false;
    });
  }
}
