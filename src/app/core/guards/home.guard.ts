
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class homeGuard {

  constructor(private authService: AuthService, private router: Router) {}


  async canActivate(): Promise<boolean> {
    try {
      const isLoggedIn = await this.authService.getLoggin();
      if(!isLoggedIn){
        return true;

      }
      else{
        this.router.navigate(['home']);
      }
      return isLoggedIn;

    } catch (error) {
      // Manejar el error si es necesario
      console.error(error);

      return false;
    }
  }


}


