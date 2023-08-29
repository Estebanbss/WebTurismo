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
  admin: string = 'juanesbs2003@hotmail.com';// Prueba de Admin
  url: string = "https://firebasestorage.googleapis.com/v0/b/centurhuila-b9e47.appspot.com/o/%1BtouristAttractions%2Fbalneario-las-quemadas%2Fgalery%2FWhatsApp%20Image%202021-08-08%20at%207.48.54%20AM%20(1).jpeg?alt=media&token=b2b242ae-09de-47fd-b3ae-484a4e1853c3";
  url2: string = "https://centurhuila.com.co/";
  tilesData = [
    //************************************* */
    {
      imageUrl: this.url,
      linkUrl: this.url2,
      altText: 'imgMunicipioNeiva',
      headingText: 'Neiva'
    },
  //************************************* */
    {
      imageUrl: this.url,
      linkUrl: this.url2,
      altText: 'imgMunicipioPitalito',
      headingText: 'Pitalito'
    },
  //************************************* */
    {
      imageUrl: this.url,
      linkUrl: this.url2,
      altText: 'imgMunicipioAltamira',
      headingText: 'Altamira'
    },
  //************************************* */
    {
      imageUrl: this.url,
      linkUrl: this.url2,
      altText: 'imgMunicipioGarzón',
      headingText: 'Garzón'
    },
  //************************************* */
    {
      imageUrl: this.url,
      linkUrl: this.url2,
      altText: 'imgMunicipioSanAgustín',
      headingText: 'San Agustín'
    },
  //************************************* */
    {
      imageUrl: this.url,
      linkUrl: this.url2,
      altText: 'imgMunicipioRivera',
      headingText: 'Rivera'
    },
  //************************************* */
  ];

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
      this.router.navigate(['/login']); //login **importante**
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
