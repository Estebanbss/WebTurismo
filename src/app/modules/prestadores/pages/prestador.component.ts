import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ModalServiceService } from 'src/app/core/services/modal-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-prestador',
  templateUrl: './prestador.component.html',
  styleUrls: ['./prestador.component.css'],

})
export class PrestadorComponent {
  id1!: string;
  id2!: string;
  id3!: number;
  private modalDataSubscription!: Subscription;
  nombreMunicipio!: string;
  nombrePrestador!: string;
  buttonGallery: boolean = false;
  turnModal: boolean = false;
  pag:string = "Servicios";
  currentPage: number = 1; // Página actual
  itemsPerPage: number = 3; // Cantidad de elementos por página
  buttonPags: string[] = ["Servicios","Horarios"];

/**esto no hace nada  */
  noHaceNada(vacio:null){
    return vacio;
  }

/**
 * An array of objects representing different types of services offered by a provider.
 * Each object has a `title` and an `id` property.
 */
servi: any = [
  {
    "title": "Alojamiento Urbano",
    "id": "alojamientoUrbano"
  },
  {
    "title": "Alojamiento Rural",
    "id": "alojamientoRural"
  },
  {
    "title": "Restaurantes",
    "id": "restaurantes"
  },
  {
    "title": "Tiendas de Café",
    "id": "tiendasDeCafe"
  },
  {
    "title": "Antojos típicos",
    "id": "antojosTipicos"
  },
  {
    "title": "Sitio Natural",
    "id": "sitioNatural"
  },
  {
    "title": "Patrimonio Cultural",
    "id": "patrimonioCultural"
  },
  {
    "title": "Miradores",
    "id": "miradores"
  },
  {
    "title": "Parques Naturales",
    "id": "parquesNaturales"
  },
  {
    "title": "Agencias de Viaje",
    "id": "agenciasDeViaje"
  },
  {
    "title": "Centro recreativo",
    "id": "centroRecreativo"
  },
  {
    "title": "Guia de Turísmo",
    "id": "guiasDeTurismo"
  },
  {
    "title": "Aventura",
    "id": "aventura"
  },
  {
    "title": "Agro y eco turismo",
    "id": "agroYEcoturismo"
  },
  {
    "title": "Planes o Rutas",
    "id": "planesORutas"
  },
  {
    "title": "Artesanías",
    "id": "artesanias"
  },
  {
    "title": "Transporte",
    "id": "transporte"
  },
  {
    "title": "Eventos",
    "id": "eventos"
  }
];



/**
 * Array of strings containing URLs for images in the image gallery.
 */
  imgGallery: string[] = [
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/f8/31/4f/restaurante-hotel.jpg?w=1200&h=-1&s=1",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/dd/91/11/sumergete-en-nuestra.jpg?w=1200&h=-1&s=1",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/f7/82/76/la-huerta-hotel.jpg?w=1200&h=-1&s=1",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/59/43/74/hotel-ms-la-huerta-plus.jpg?w=1200&h=-1&s=1",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/3d/f4/e3/photo5jpg.jpg?w=1200&h=-1&s=1",
    "https://media-cdn.tripadvisor.com/media/photo-s/25/d0/3f/cd/un-comedor-de-400-anos.jpg",
    "https://media-cdn.tripadvisor.com/media/photo-w/25/d0/40/42/un-comedor-de-400-anos.jpg",
    "https://media-cdn.tripadvisor.com/media/photo-w/25/d0/3f/82/un-comedor-de-400-anos.jpg",
    "https://media-cdn.tripadvisor.com/media/photo-s/11/36/3e/c8/culinarium-at-mylos.jpg",
    "https://media-cdn.tripadvisor.com/media/photo-w/11/36/3f/5f/the-view.jpg",
    "https://media-cdn.tripadvisor.com/media/photo-w/11/36/3f/01/bon-appetite.jpg"
  ];
//todo OJITO TIENE QUE SER IGUALITO EL CONTENIDO DEL ARREGLO AL COMPONENTE DE PRESTADOR O SI NO SE DAÑA

  constructor(private route: ActivatedRoute, private title: Title, private router: Router, private modalService: ModalServiceService //Inyectamos el servicio del modal
  ) {
    this.title.setTitle('Pal\'Huila - Prestadores!' );

    this.route.params.subscribe(params => {
      // params contendrá los valores de los parámetros de ruta
      this.id1 = this.capitalizeFirstLetter(params['municipio'])
      this.id2 = params['prestador'];
      this.id3 = params['option'];


    });

    this.nombreMunicipio = this.id1
    this.nombrePrestador = this.id2

    if(this.imgGallery.length > 3){
      this.buttonGallery = true;
    }

  }

/**
 * Sends the selected option to the slider component and navigates to the slider route.
 * @param option - The selected option to be sent to the slider component.
 */
  send(option: number) {

    this.turnModal = true;
    this.id3 = option;
    // Construct the new route with "slider/:option" adde
    // Navigate to the new route
    this.router.navigate(['slider', option], { relativeTo: this.route })

  }

/**
 * Navigates to the gallery page for the current prestador.
 */
  gallery(): void{

    this.router.navigateByUrl(`/prestadores/${this.id1}/${this.id2}/gallery`)
  }

/**
 * Sets the current page option for pagination.
 * @param option - The selected page option.
 */
  buttonPag(option:string){
    this.pag = option;
  }


/**
 * Capitalizes the first letter of a string.
 * @param inputString The string to capitalize.
 * @returns The capitalized string.
 */
  capitalizeFirstLetter(inputString: string): string {
    if (inputString.length === 0) {
      return inputString;
    }
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.servi.length) {
      this.currentPage++;
    }
  }

  ngOninit(){

    this.modalDataSubscription = this.modalService.modalTurnSliderP$.subscribe((value) => {
      this.turnModal = value;

    });

  }



  ngOndestroy(){
    this.modalDataSubscription.unsubscribe();
  }

}
