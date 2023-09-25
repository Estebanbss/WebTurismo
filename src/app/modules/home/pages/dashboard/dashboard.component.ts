import { getDownloadURL, getStorage, ref } from '@angular/fire/storage';
import { Component, OnInit, ElementRef, Renderer2, ViewChild, HostListener, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/modules/home/services/home.service';
import { Municipio } from 'src/app/core/models/municipio-model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private homeService: HomeService, // Inyecta el servicio HomeService
    private router: Router, // Inyecta el servicio Router
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}
  storage = getStorage(); // Variable para almacenar el storage de Firebase
  dataUser: any; // Variable para almacenar los datos del usuario
  admin: string = 'juanesbs2003@hotmail.com';

  muni: string[] = [ // Array de municipios del Huila
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
  'Yaguará', // ... (tu lista de municipios)
  ];

  servi: string[] = [
    "Alojamiento Urbano",
    "Alojamiento Rural",
    "Restaurantes",
    "Tiendas de Café",
    "Antojos típicos",
    "Sitio Natural",
    "Patrimonio Cultural",
    "Miradores",
    "Parques Naturales",
    "Agencias de Viajes",
    "Centro recreativo",
    "Guias de Turísmo",
    "Aventura",
    "Agro y eco turismo",
    "Planes o Rutas",
    "Artesanías",
    "Eventos",
  ]

  tilesDataCategorias: Municipio[] = []; // Array de categorías

  randomuni = [...this.muni]; // Copia de los municipios
  isDragging = false; startX!: number; startScrollLeft: any; // Variables para el scroll horizontal
  tilesData: Municipio[] = []; // Array de municipios

  @ViewChild("carousel") carousel!: ElementRef;
  @ViewChild("arrowButtons") arrowButtons!:QueryList<ElementRef>;
  @HostListener("mousedown",[ "$event" ])

  dragStart = (e:MouseEvent) => {

    this.isDragging = true;
    this.startX = e.pageX
    this.startScrollLeft =  this.carousel.nativeElement.scrollLeft;
  }


  @HostListener("mousemove",[ "$event" ])

  dragging = (e:MouseEvent) => {

    if(!this.isDragging) return; // Si no se está arrastrando, no hacer nada
    // Si se está arrastrando, calcular la posición del scroll
    if(this.carousel.nativeElement.contains(e.target)){// Si el elemento contiene el evento
      // Mover el scroll horizontal
      this.carousel.nativeElement.classList.add("dragging");
      this.carousel.nativeElement.scrollLeft = this.startScrollLeft - (e.pageX - this.startX)
   }

  }

  @HostListener("mouseup",[ "$event" ])
  dragStop = (e:MouseEvent) => {
    this.isDragging = false;
    this.carousel.nativeElement.classList.remove("dragging");
  }



  private async fetchUrls(): Promise<string[]> {
    // Método para obtener los URLs de las imágenes
    const promises: Promise<string>[] = this.randomuni.map(async (municipio) => {
      const pathReference = ref(this.storage, `Banner/${municipio}.webp`);
      try {
        const url = await getDownloadURL(pathReference);
        return url;
      } catch (error:any) {
        if (error.code === 'storage/object-not-found') {
          console.log(`File doesn't exist for ${municipio}`);
        }
        return ''; // Retornar una cadena vacía en caso de error
      }
    });

    return Promise.all(promises);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      console.log(button.id);
    });


    this.fetchUrls().then((urls) => {
      // Almacenar los URLs en tilesData
      this.tilesData = this.randomuni.map((municipio, index) => ({
        title: municipio,
        img: urls[index],
        alt: `${municipio}image`,
      }));
    });


  }

  logOut(): void {
    this.homeService // Cierra la sesión
      .cerrarSesion()
      .then(() => {
        // Si se cierra la sesión
        this.router.navigate(['auth/login']); // Redirige al login
      })
      .catch((error) => console.log(error)); // Si no se cierra la sesión, muestra el error
  }
}
