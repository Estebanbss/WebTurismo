
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  dataUser: any;// Se podría implementar una interfaz para esta propiedad

  //Propiedad a la que se le asigna el Administrador
  admin: string = 'juanesbs2003@hotmail.com'; // Prueba de Admin
  // mejorar para extraer correos admin desde la base de datos
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
    if(user?.email == this.admin ) {
      // this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/dashboard']); //login **importante**
    }
  }


}





  //Propiedad para almacenar el usuario y mostrarlo en el template

