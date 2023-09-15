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

    // Encuentra el elemento con la clase "carousel"
    // Encuentra el elemento con la clase "carousel"
    const carousel = this.el.nativeElement.querySelector('.carousel');

    // Encuentra todos los elementos con la clase "arrow-icons"
    const arrowIcons = this.el.nativeElement.querySelectorAll('.arrow-icons');

    // Encuentra el primer elemento con la clase "imgcarousel"
    const firstImg = this.el.nativeElement.querySelector('.imgcarousel');

    // Inicializa las variabl

    // Obtiene el ancho del primer elemento con la clase "imgcarousel"
    let firstImgWitdh = firstImg!.clientWidth + 16;



    // Recorre todos los elementos con la clase "arrow-icons"

    const showHideIcons = () => {
      let scrollWidth = carousel!.scrollWidth - carousel!.clientWidth;
      // Muestra u oculta las flechas de acuerdo a la posición del scroll
      arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
      arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";

    }

    arrowIcons.forEach((icon: { addEventListener: (arg0: string, arg1: () => void) => void; id: string; }) => {
      icon.addEventListener('click', () => {
        let firstImgWitdh = firstImg!.clientWidth + 16;
        carousel!.scrollLeft += icon.id == "left" ? -firstImgWitdh : firstImgWitdh;
        setTimeout( () => showHideIcons(), 60);
      });
    })

    let isPointerDown = false, prevPageX: number, prevScrollLeft: number;

    const pointerDown = (e: any) => {
      isPointerDown = true;
      prevPageX = e.pageX || e.touches[0].pageX;
      prevScrollLeft = carousel!.scrollLeft;
    }

    const pointerMove = (e: any) => {
      if (!isPointerDown) return;

      e.preventDefault();
      carousel?.classList.add("dragging");
      let positionDiff = ((e.pageX || e.touches[0].pageX) - prevPageX)*2;
      carousel!.scrollLeft = prevScrollLeft - positionDiff;
      showHideIcons();
    }

    const pointerUp = (e: any) => {
      isPointerDown = false;
      carousel?.classList.remove("dragging");
    }

    if (carousel) {
      carousel.addEventListener('mousedown', pointerDown);
      carousel.addEventListener('mousemove', pointerMove);
      carousel.addEventListener('mouseup', pointerUp);

      carousel.addEventListener('touchstart', pointerDown);
      carousel.addEventListener('touchmove', pointerMove);
      carousel.addEventListener('touchend', pointerUp);
      carousel.addEventListener('mouseleave', pointerUp);
      carousel.addEventListener('mouselave', pointerUp);
    }
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
