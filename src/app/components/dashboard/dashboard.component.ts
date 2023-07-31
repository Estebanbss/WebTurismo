import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //Propiedad para almacenar el usuario y mostrarlo en el template
  dataUser: any;// Se podría implementar una interfaz para esta propiedad

  //Propiedad a la que se le asigna el Administrador
  admin: string = 'sanvargas02@hotmail.com'; // Prueba de Admin

  // adminButton: any; // Booleano para validación de botónes

  constructor(
    private userService: UserService, //Inyectamos el servicio con métodos de Firebase y manejo de Errores
    private router: Router //Inyectamos la clase Router para dirigirnos a otros componentes
  ) {
    //Vacío
  }

  //Método que me carga código mucho antes de que el usuario pueda ver la interfaz.
  ngOnInit(): void {
    // Comporbamos si hay un usuario logeado o si estamos deslogueados
    //Nos imprime el console en el template
    let user = this.userService.usuarioActual();
    // console.log(user);
    // Usuario diferente de null y Verificado
    if(user && user.emailVerified) {
      this.dataUser = user;
      // if (this.dataUser.email === this.admin) {
      //   this.adminButton = true;
      // } else {
      //   this.adminButton = false;
      // }
    } else {
      this.router.navigate(['/login']);
    }
  }

  logOut() {
    this.userService.cerrarSesion()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }

}
