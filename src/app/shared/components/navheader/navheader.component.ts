
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { ModalServiceService } from 'src/app/core/services/modal-service.service';
import { Subscription } from 'rxjs';
import { getAuth, user } from '@angular/fire/auth';


@Component({
  selector: 'app-navheader',
  templateUrl: './navheader.component.html',
  styleUrls: ['./navheader.component.css']
})

export class NavheaderComponent implements OnInit{

  private modalDataSubscription!: Subscription;
  private modalDataSubscription2!: Subscription;
  auth = getAuth();
  pfp!: string | null;
  expanded?:boolean
  expanded2?:string = "abierto"
  dataUser: any;
  adminButton = false;
  UserName!:string | null;
  loading = false;

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


    this.modalDataSubscription2 = this.userService.rolSubject$.subscribe((value) => {
      if(value === "admin" || value === "superadmin"){
        this.adminButton = true;


      }


      this.UserName = this.auth.currentUser!.displayName;
      this.pfp = this.auth.currentUser!.photoURL;

      console.log(this.UserName)
      console.log(this.pfp)

      this.loading = true;

    });




    } ;

    ngAfterViewChecked(): void {


    }




    ngOnDestroy() {
      if (this.modalDataSubscription) {
        this.modalDataSubscription.unsubscribe();
      }
      if (this.modalDataSubscription2) {
        this.modalDataSubscription2.unsubscribe();
      }

    }


}



