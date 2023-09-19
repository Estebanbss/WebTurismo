import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private Router:Router) { }
  auth = getAuth();
  islog:boolean = false;

  islogged(){
    let user = this.auth.currentUser;
    onAuthStateChanged(this.auth, (user) => {
     if (user) {
       this.islog = true;
     } else {
       this.islog = false;
     }
   });
  }



  getAuthToken(): Observable<boolean> {
    let poom:boolean =false;
    if (this.islog){
      poom = true;
    }else{
      this.Router.navigate(['auth/login']);
      poom = false;
    }
    console.log(poom);  
    return of(poom);


  }

}
