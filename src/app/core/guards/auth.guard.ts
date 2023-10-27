import { AuthService } from './../auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class authGuard {

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    try {
      const isLoggedIn = await this.authService.getLoggin();
      if(!isLoggedIn){
        console.log("AUTH")
      this.router.navigate(['auth']);
      }
      else{
        console.log("Si puedes pasar al Home")

      }
      return isLoggedIn;

    } catch (error) {
      // Manejar el error si es necesario
      console.error(error);
      return false;
    }
  }

}
