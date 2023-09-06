import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/modules/home/services/home.service';
import { Observable } from 'rxjs';
import { Storage, ref,  listAll, getDownloadURL } from '@angular/fire/storage';

export interface municipio {
  title: string;
  img:string;
  alt:string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})


export class DashboardComponent implements OnInit {
  //Propiedad para almacenar el usuario y mostrarlo en el template
  dataUser: any;
   // Se podría implementar una interfaz para esta propiedad




  //Propiedad a la que se le asigna el Administrador
  admin: string = 'juanesbs2003@hotmail.com'; // Prueba de Admin

  muni = [
    'Acevedo',
    'Aipe',
    'Algeciras',
    'Altamira',
    'Baraya',
    'Campoalegre',
    'Colombia',
    'Elías',
    'El Agrado',
    'Garzón',
    'Gigante',
    'Guadalupe',
    'Hobo',
    'Íquira',
    'Isnos',
    'La Argentina',
    'La Plata',
    'Nátaga',
    'Neiva',
    'Oporapa',
    'Paicol',
    'Palermo',
    'Palestina',
    'Pital',
    'Pitalito',
    'Rivera',
    'Saladoblanco',
    'Santa María',
    'San Agustín',
    'Suaza',
    'Tarqui',
    'Tello',
    'Teruel',
    'Tesalia',
    'Timaná',
    'Villavieja',
    'Yaguará',
  ];


  public tilesData: Array<municipio> = [];




  iter(): void {
    let i: number = 0;

    while (i < 37) {

      this.tilesData.push({
        title: this.muni[Math.floor(Math.random() * 37)],
        img:"https://firebasestorage.googleapis.com/v0/b/centurhuila-b9e47.appspot.com/o/Banner%2FAcevedo.webp?alt=media&token=89738193-ac05-4787-9a39-07d9ccb18243",
        alt:"Garzónimg"
      })

      i++;
    }
  }


  // adminButton: any; // Booleano para validación de botónes

  constructor(
    private homeService: HomeService, //Inyectamos el servicio con métodos de Firebase y manejo de Errores
    private router: Router,


  ) //Inyectamos la clase Router para dirigirnos a otros componentes
  {

  }

  //Método que me carga código mucho antes de que el usuario pueda ver la interfaz.
  ngOnInit(): void {
    // Comporbamos si hay un usuario logeado o si estamos deslogueados
    //Nos imprime el console en el template
    let user = this.homeService.usuarioActual();
    // console.log(user);
    // Usuario diferente de null y Verificado
    if (user && user.emailVerified) {
      this.dataUser = user;
      // if (this.dataUser.email === this.admin) {
      //   this.adminButton = true;
      // } else {
      //   this.adminButton = false;
      // }
    } else {
      this.router.navigate(['auth/login']); //login **importante**
    }

    this.iter();
  }

  logOut() {
    this.homeService
      .cerrarSesion()
      .then(() => {
        this.router.navigate(['auth/login']);
      })
      .catch((error) => console.log(error));
  }
}
