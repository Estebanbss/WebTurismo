import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/modules/home/services/home.service';
import { Observable } from 'rxjs';
import { Storage, ref,  listAll, getDownloadURL } from '@angular/fire/storage';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  //Propiedad para almacenar el usuario y mostrarlo en el template
  dataUser: any;
   // Se podría implementar una interfaz para esta propiedad
  images: string[];

  fullPaths: string[]

  arregloDePromesas: Promise<any>[];


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


  tilesData = [];

  // adminButton: any; // Booleano para validación de botónes

  constructor(
    private homeService: HomeService, //Inyectamos el servicio con métodos de Firebase y manejo de Errores
    private router: Router,
    private storage: Storage,

  ) //Inyectamos la clase Router para dirigirnos a otros componentes
  {
    this.images = []; //Se inicializa la propiedad
    this.fullPaths = []; // Inicializamos
    this.arregloDePromesas = [];
  }


  getImagies() {

    this.images = [];

    //fullPaths es sólo un ejemplo de arreglo que no persiste en este ejemplo concreto
    //fullPaths debe ser remplazado por la propiedad del objeto (Plance) que almacene el arrelgo de paths
    this.fullPaths.forEach(async fullPath => {
      // console.log(fullPath);

      //Creamos una referencia a la o las imágenes que deseamos
      const pathReference = ref(this.storage, fullPath);

      //Utilizamos el método de firebase para obtener la o las url de descarga
      const url = await getDownloadURL(pathReference);
      this.images.push(url);

    })

  } //

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
