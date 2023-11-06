import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { getAuth, onAuthStateChanged, updateProfile } from '@angular/fire/auth';
import { ModalServiceService } from 'src/app/core/services/modal-service.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-navheader',
  templateUrl: './navheader.component.html',
  styleUrls: ['./navheader.component.css']
})

export class NavheaderComponent implements OnInit{

  private modalDataSubscription!: Subscription;
  expanded?:boolean
  expanded2?:string = "abierto"
  dataUser: any;
  admin: string = 'juanesbs2003@hotmail.com';
  adminButton = false;
  auth = getAuth();
      // console.log(user);

  toggleExpanded() {
    this.expanded = this.expanded == true ? this.expanded = false : this.expanded = true;

    this.expanded2 = "cerrado"
  }

  toggleExpanded2() {
    if(this.expanded2 === "cerrado"){
      this.expanded2 = "abierto"
    }
    else{
      this.expanded2 = "cerrado"
    }
    this.expanded = false; // Asegura que expanded esté en false cuando expanded2 cambie
  }



  constructor(private userService: UserService, private router: Router,   private modalService: ModalServiceService,){}

  logOut() {
    this.userService.update().then(()=>{
      this.userService.cerrarSesion().then(()=>{this.router.navigate(['/auth/login']);}).catch((error)=>{console.log(error)})
     }).catch((error)=>{console.log(error)})


  }

  defaultUser:string | undefined = this.auth.currentUser?.email?.substring(0,6);



  UserARRAY:string | undefined | string[] | Promise<void> = this.auth.currentUser?.displayName === null ? this.defaultUser : this.auth.currentUser?.displayName?.split(" ");

  UserName!:string | undefined;


  capitalizeFirstLetter(inputString: string): string {
    if (inputString.length === 0) {
      return inputString;
    }
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }


  ngOnInit(){

    this.modalDataSubscription = this.modalService.modalPFHeader$.subscribe((value) => {
      this.expanded = value;
      if(value === true){
        this.expanded2 = "abierto"
      }
      else{
        this.expanded2 = "cerrado"
      }
    });



      this.UserName=this.capitalizeFirstLetter(this.UserARRAY!.toString());




     onAuthStateChanged(this.auth, (user) => {
      if (user?.email === this.admin) {
        this.adminButton = true;
      } else {
        this.adminButton = false;
      }
    });


    } ;


    ngOnDestroy() {
      if (this.modalDataSubscription) {
        this.modalDataSubscription.unsubscribe();
      }

    }


}



