import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserEdit implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  url!: string;
  canActivate(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const profileId = this.getProfileIdFromRoute(); // Obtener el 'id' de los parámetros de la ruta
      if (profileId) {
        this.authService.obtenerUsuarioPorUserName(profileId).subscribe((user) => {
          this.authService.onAuthStateChanged((userauth) => {
            const canEdit = this.verify(userauth, user[0]);
            resolve(canEdit);
          });
        });
      } else {


        //se va a la ruta anterior NO AL HOME
        this.router.navigateByUrl(`/${this.router.url.split('/')[1]}/${this.router.url.split('/')[2]}`);
        resolve(false); // Resolves to false if the 'id' of the route is not obtained

      }
    });
  }

  private getProfileIdFromRoute(): string | null {

    if(this.router.url.split('/')[2]){
    return this.router.url.split('/')[2];
    }else{
      return null;
    }
  }

  private verify(userauth: any, user: any): boolean {
    // Verificar si userauth y user están definidos y si sus identificadores coinciden
    return !!userauth && !!user && userauth.uid === user.uid;
  }
}
