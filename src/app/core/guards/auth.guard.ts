
import { AuthService } from './../auth.service';
import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class authGuard {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getLoggin()) {
      console.log("paso por el guard")
      console.log(this.authService.getLoggin())
      return true;
    } else {
      this.router.navigate(['auth']);
      return false;
    }
  }


}


