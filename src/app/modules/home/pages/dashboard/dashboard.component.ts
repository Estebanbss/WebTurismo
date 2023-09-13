import { Component, OnInit,} from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/modules/home/services/home.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

interface Municipio {
  title?: string;
  img: string;
  alt: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  dataUser: any;
  admin: string = 'juanesbs2003@hotmail.com';

  muni: string[] = [ // 37  municipios del Huila
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

  tilesData: Municipio[] = []; // 6 municipios aleatorios

  constructor(
    private homeService: HomeService, // Inyecta el servicio HomeService
    private router: Router,
     // Inyecta el servicio Router// Inyecta el servicio Renderer2
  ) {}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }


  ngOnInit(): void {
    const user = this.homeService.usuarioActual();// Obtiene el usuario actual

    if (user && user.emailVerified) {// Si el usuario existe y está verificado
      this.dataUser = user;// Asigna los datos del usuario a la variable dataUser
    } else {
      this.router.navigate(['auth/login']);// Si no está verificado, redirige al login
    }

    this.iter();// Llama a la función iter()

  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tilesData, event.previousIndex, event.currentIndex);
  }











  logOut(): void {
    this.homeService // Cierra la sesión
      .cerrarSesion()
      .then(() => {// Si se cierra la sesión
        this.router.navigate(['auth/login']);// Redirige al login
      })
      .catch((error) => console.log(error));// Si no se cierra la sesión, muestra el error
  }

  private getRandomMuni(){// Obtiene un municipio aleatorio
    const usedNumbers: number[] = [];

    while (usedNumbers.length < 6) {// Mientras el array usedNumbers tenga menos de 6 elementos
      const randomNumber = Math.floor(Math.random() * this.muni.length);// Genera un número aleatorio entre 0 y 36

      if (!usedNumbers.includes(randomNumber)) {// Si el array usedNumbers no incluye el número aleatorio
        usedNumbers.push(randomNumber);// Agrega el número aleatorio al array usedNumbers
        return this.muni[randomNumber];// Retorna el nombre del municipio en la posición randomNumber
      }
    }
  }

  private iter(): void {// Llena el array tilesData con 6 municipios aleatorios
    for (let i = 0; i < 6; i++) {// 6 municipios aleatorios
      this.tilesData.push({
        title: this.getRandomMuni(),// Asigna el nombre del municipio
        img: 'https://firebasestorage.googleapis.com/v0/b/centurhuila-b9e47.appspot.com/o/Banner%2FAcevedo.webp?alt=media&token=89738193-ac05-4787-9a39-07d9ccb18243',// Asigna la URL de la imagen
        alt: 'Garzónimg',// Asigna el texto alternativo de la imagen
      });
    }
  }
}
