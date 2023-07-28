import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(
    private userService: UserService, //Inyectamos el servicio con métodos de Firebase y manejo de Errores
    private router: Router //Inyectamos la clase Router para dirigirnos a otros componentes
  ) {
    //Vacío
  }

  ngOnInit(): void {
    // Comporbamos si hay un usuario logeado o si estamos deslogueados
    //Nos imprime el console en el template
    let user = this.userService.usuarioActual();
    console.log(user);
  }

  logOut() {
    this.userService.cerrarSesion()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }

}
