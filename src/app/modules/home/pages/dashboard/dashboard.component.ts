import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/modules/home/services/home.service';
import { NgOptimizedImage } from '@angular/common';
import { Storage } from '@angular/fire/storage';


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

  slideConfig = {
  "slidesToShow": 3,
  "slidesToScroll": 1,
  "autoplay": true,
  "PauseOnHover": true,
  "infinite": true,
  "autoplaySpeed": 2000,
  "responsive":[
    {
      "breakpoint": 992,
      "settings":{
        "arrows":true,
        "infinite":true,
        "slidesToShow":3,
        "slidesToScroll":1,
      }
    },
    {
      "breakpoint": 768,
      "settings":{
        "arrows": true,
        "infinite": true,
        "slidesToShow": 1,
        "slidesToScroll": 1,
      }
    }
  ]
};

  slickInit(e:any) {
    console.log('slick initialized');
  }

  breakpoint(e:any) {
    console.log('breakpoint');
  }

  afterChange(e:any) {
    console.log('afterChange');
  }

  beforeChange(e:any) {
    console.log('beforeChange');
  }


  muni: string[] = [ // 37  municipios del Huila
  "Acevedo",
  "Aipe",
  "Algeciras",
  "Altamira",
  "Baraya",
  "Campoalegre",
  "Colombia",
  "Elías",
  "El Agrado",
  "Garzón",
  "Gigante",
  "Guadalupe",
  "Hobo",
  "Íquira",
  "Isnos",
  "La Argentina",
  "La Plata",
  "Nátaga",
  "Neiva",
  "Oporapa",
  "Paicol",
  "Palermo",
  "Palestina",
  "Pital",
  "Pitalito",
  "Rivera",
  "Saladoblanco",
  "Santa María",
  "San Agustín",
  "Suaza",
  "Tarqui",
  "Tello",
  "Teruel",
  "Tesalia",
  "Timaná",
  "Villavieja",
  "Yaguará",
  ];

  randomuni = [...this.muni];
  tilesData: Municipio[] = []; // 6 municipios aleatorios
  width: { [klass: string]: any; } | null | undefined; // Ancho de la pantalla

  constructor(
    private homeService: HomeService, // Inyecta el servicio HomeService
    private router: Router, // Inyecta el servicio Router
    private el: ElementRef, private renderer: Renderer2,
    // Inyecta el servicio Router// Inyecta el servicio Renderer2
  ) { }



  ngAfterViewInit(): void {




  }




  ngOnInit(): void {
    const user = this.homeService.usuarioActual();// Obtiene el usuario actual

    if (user && user.emailVerified) {// Si el usuario existe y está verificado
      this.dataUser = user;// Asigna los datos del usuario a la variable dataUser
    } else {
      this.router.navigate(['auth/login']);// Si no está verificado, redirige al login
    }


    this.iter();
  }


  logOut(): void {
    this.homeService // Cierra la sesión
      .cerrarSesion()
      .then(() => {// Si se cierra la sesión
        this.router.navigate(['auth/login']);// Redirige al login
      })
      .catch((error) => console.log(error));// Si no se cierra la sesión, muestra el error
  }



  private iter(): void {
    this.randomuni.sort(function() {return Math.random() - 0.5});
    for (let i = 0; i < this.randomuni.length; i++){

      this.tilesData.push({
        title: this.randomuni[i],
        img: 'https://firebasestorage.googleapis.com/v0/b/centurhuila-b9e47.appspot.com/o/Banner%2FAcevedo.webp?alt=media&token=89738193-ac05-4787-9a39-07d9ccb18243',
        alt: 'Garzónimg',
      });

    }

  }




}
