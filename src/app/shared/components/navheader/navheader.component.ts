import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {Unsubscribable} from "rxjs"
import { UserService } from 'src/app/modules/auth/services/user.service';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';


@Component({
  selector: 'app-navheader',
  templateUrl: './navheader.component.html',
  styleUrls: ['./navheader.component.css']
})

export class NavheaderComponent implements OnInit, OnDestroy {
  expanded = false;
  expanded2 = false;
  dataUser: any;
  admin: string = 'juanesbs2003@hotmail.com';
  adminButton = false;
  auth = getAuth();
      // console.log(user);

  toggleExpanded() {
    this.expanded = !this.expanded;
    this.expanded2 = false; // Asegura que expanded2 esté en false cuando expanded cambie
  }

  toggleExpanded2() {
    this.expanded2 = !this.expanded2;
    this.expanded = false; // Asegura que expanded esté en false cuando expanded2 cambie
  }



  constructor(private userService: UserService, private router: Router, private authSubscription: Subscription){}
  logOut() {
    this.userService.cerrarSesion()
      .then(() => {
        this.router.navigate(['auth/login']);
      })
      .catch(error => console.log(error));
  }

  ngOnInit(){


    let user = this.auth.currentUser;
     this.authSubscription = onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.adminButton = true;
      } else {
        this.adminButton = false;
      }
    });


    } ;

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }
}



