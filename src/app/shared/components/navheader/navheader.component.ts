import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navheader',
  templateUrl: './navheader.component.html',
  styleUrls: ['./navheader.component.css']
})
export class NavheaderComponent implements OnInit {
  expanded = false;
  expanded2 = false;
  dataUser: any;
  admin: string = 'juanesbs2003@hotmail.com';
  adminButton = false;

      // console.log(user);

  toggleExpanded() {
    this.expanded = !this.expanded;
    this.expanded2 = false; // Asegura que expanded2 esté en false cuando expanded cambie
  }

  toggleExpanded2() {
    this.expanded2 = !this.expanded2;
    this.expanded = false; // Asegura que expanded esté en false cuando expanded2 cambie
  }



  constructor(private userService: UserService, private router: Router){}
  logOut() {
    this.userService.cerrarSesion()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }

  ngOnInit(): void {

    let user = this.userService.usuarioActual();

        if (user?.email == this.admin) {
          this.adminButton = true;
        } else {
          this.adminButton = false;
        }

    } ;


}



