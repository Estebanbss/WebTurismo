import { Component, OnInit,ElementRef, Renderer2} from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/modules/home/services/home.service';
import { NgOptimizedImage } from '@angular/common';

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
width: { [klass: string]: any; }|null|undefined;

  constructor(
    private homeService: HomeService, // Inyecta el servicio HomeService
    private router: Router,
    private el: ElementRef, private renderer: Renderer2
     // Inyecta el servicio Router// Inyecta el servicio Renderer2
  ) {}
  ngAfterViewInit(): void {

      // Encuentra el elemento con la clase "carousel"
 // Encuentra el elemento con la clase "carousel"
const carousel = this.el.nativeElement.querySelector('.carousel');

// Encuentra todos los elementos con la clase "arrow-icons"
const arrowIcons = this.el.nativeElement.querySelectorAll('.arrow-icons');

// Encuentra el primer elemento con la clase "imgcarousel"
const firstImg = this.el.nativeElement.querySelector('.imgcarousel');



    let isDragStart = false, prevPageX: number, prevScrollLeft: number;
    let firstImgWitdh = firstImg!.clientWidth + 16;
    console.log(firstImgWitdh)

    arrowIcons.forEach((icon: { addEventListener: (arg0: string, arg1: () => void) => void; id: string; })=>{
      icon.addEventListener('click',()=>{
        carousel!.scrollLeft += icon.id == "left" ? -firstImgWitdh : firstImgWitdh;
      });
    })

    const dragStart = (e:any) => {
      //actualiza la posicion del mouse
      isDragStart = true;
      prevPageX = e.pageX;
      prevScrollLeft = carousel!.scrollLeft;
    }

    const dragging = (e:any) => {
      if(!isDragStart) return;

      e.preventDefault();
      carousel?.classList.add("dragging");
      let positionDiff = e.pageX - prevPageX;
      carousel!.scrollLeft = prevScrollLeft - positionDiff;
    }

    const dragStop = (e:any) => {
      isDragStart = false;
      carousel?.classList.remove("dragging");
    }

     if(carousel){

      carousel.addEventListener('mousedown',dragStart);

      carousel.addEventListener('mousemove',dragging);

      carousel.addEventListener('mouseup', dragStop);

    }


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













  logOut(): void {
    this.homeService // Cierra la sesión
      .cerrarSesion()
      .then(() => {// Si se cierra la sesión
        this.router.navigate(['auth/login']);// Redirige al login
      })
      .catch((error) => console.log(error));// Si no se cierra la sesión, muestra el error
  }                                                        
 usedNumbers: number[] = [];
  private getRandomMuni(){// Obtiene un municipio aleatorio


    while (this.usedNumbers.length < 36) {// Mientras el array usedNumbers tenga menos de 6 elementos
      const randomNumber = Math.floor(Math.random() * this.muni.length);
      console.log(randomNumber)// Genera un número aleatorio entre 0 y 36

      if (!this.usedNumbers.includes(randomNumber)) {// Si el array usedNumbers no incluye el número aleatorio
        this.usedNumbers.push(randomNumber);// Agrega el número aleatorio al array usedNumbers
        return this.muni[randomNumber];// Retorna el nombre del municipio en la posición randomNumber
      }
      console.log(this.usedNumbers)
    }
  }

  private iter(): void {// Llena el array tilesData con 6 municipios aleatorios
    for (let i = 0; i < 36; i++) {// 6 municipios aleatorios
      this.tilesData.push({
        title: this.getRandomMuni(),// Asigna el nombre del municipio
        img: 'https://firebasestorage.googleapis.com/v0/b/centurhuila-b9e47.appspot.com/o/Banner%2FAcevedo.webp?alt=media&token=89738193-ac05-4787-9a39-07d9ccb18243',// Asigna la URL de la imagen
        alt: 'Garzónimg',// Asigna el texto alternativo de la imagen
      });
    }
  }
}
