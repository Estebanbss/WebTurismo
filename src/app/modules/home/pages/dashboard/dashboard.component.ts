import { ModalServiceService } from 'src/app/core/services/modal-service.service';
import { getDownloadURL, getStorage, ref } from '@angular/fire/storage';
import { Component, OnInit, ElementRef, ViewChild, HostListener, QueryList, Host } from '@angular/core';
import { Router} from '@angular/router';
import { HomeService } from 'src/app/core/services/home.service';
import { Municipio } from 'src/app/core/common/municipio-model';
import { Map, marker, tileLayer } from 'leaflet';
import { Title } from '@angular/platform-browser';
import { getAuth } from '@angular/fire/auth';
import { DetalleService } from 'src/app/core/services/detalle.service';
import { IndexedDBService } from 'src/app/core/services/indexedDB.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private homeService: HomeService, // Inyecta el servicio HomeService
    private router: Router,
    private titleService:Title,
    private modalService: ModalServiceService,
    private detalle: DetalleService,
    private indexedDB: IndexedDBService

  ) {

  }
  ngOnInit(): void {
    this.titleService.setTitle('Pal\'Huila - Explora!');;
    this.modalService.setProfileHeader(false);
    this.serviShuffle.sort(this.comparacionAleatoria);
    this.detalle.obtenerPrestadoresAleatorios(9,"Garzón").then((prestadores) => {
      this.prestadoresrandom = prestadores;
      // console.log("response prestadores: ", prestadores)
    }).then()
    this.detalle.obtenerAtractivosAleatorios(9,"Garzón").then((atractivos) => {
      this.atractivosrandom = atractivos;
      // console.log("response atractivos: ", atractivos)
    }).then()
  }

  ngOnDestroy(): void {

  }
  capitalizeFirstLetter(inputString: string): string {
    if (inputString.length === 0) {
      return inputString;
    }
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }



  navigate(item: any) {
    //Validamos hacia qué componente deseamos direccionar
    if ('servicios' in item) { //*Validación para Prestadores
      this.router.navigate(['prestadores', this.capitalizeFirstLetter(item.municipio), this.capitalizeFirstLetter(item.name)]);
    } else if ('bienOLugar' in item) { //*Validación para Atractivos
      this.router.navigate(['atractivos', this.capitalizeFirstLetter(item.municipio), this.capitalizeFirstLetter(item.name)]);
    }
  }


  auth = getAuth();
  storage = getStorage(); // Variable para almacenar el storage de Firebase
  prestadoresrandom: any = []; // Array de prestadores aleatorios
  atractivosrandom: any = []; // Array de prestadores aleatorios
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
  'El Pital',
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
  comparacionAleatoria = () => Math.random() - 0.5;
  servi:any = [
    {
      "title": "Alojamiento Urbano",
      "desc": "Sumérgete en la comodidad y el bullicio de la ciudad. Descubre alojamientos urbanos que ofrecen un refugio perfecto en medio de la vibrante vida urbana."
    },
    {
      "title": "Alojamiento Rural",
      "desc": "Escapa de la rutina en entornos rurales encantadores. Explora opciones de alojamiento en medio de la naturaleza que te permitirán desconectar y relajarte."
    },
    {
      "title": "Restaurantes",
      "desc": "Deléitate con los sabores auténticos de la región. Descubre restaurantes que te llevarán a un viaje culinario lleno de platos tradicionales y delicias locales."
    },
    {
      "title": "Tiendas de Café",
      "desc": "Explora el mundo del café en su máxima expresión. Visita tiendas de café donde podrás degustar y comprar productos locales que despertarán tus sentidos."
    },
    {
      "title": "Antojos típicos",
      "desc": "Satisface tus antojos con auténticas delicias locales. Descubre lugares donde podrás disfrutar de sabores típicos que te harán agua la boca."
    },
    {
      "title": "Sitio Natural",
      "desc": "Conéctate con la belleza de la naturaleza. Explora sitios naturales que te permitirán disfrutar de paisajes impresionantes y experiencias al aire libre."
    },
    {
      "title": "Patrimonio Cultural",
      "desc": "Sumérgete en la historia y la cultura de la región. Descubre lugares que albergan un rico patrimonio cultural que te transportará en el tiempo."
    },
    {
      "title": "Miradores",
      "desc": "Contempla panoramas espectaculares desde las alturas. Explora miradores que te ofrecen vistas impresionantes de la región."
    },
    {
      "title": "Parques Naturales",
      "desc": "Embárcate en aventuras naturales inolvidables. Visita parques naturales donde la biodiversidad y la belleza escénica te dejarán sin aliento."
    },
    {
      "title": "Agencias de Viaje",
      "desc": "Planifica tu próxima aventura con expertos en viajes. Descubre agencias de viajes que te ayudarán a diseñar la escapada perfecta."
    },
    {
      "title": "Centro recreativo",
      "desc": "Disfruta de entretenimiento y diversión en un solo lugar. Explora centros recreativos que ofrecen actividades emocionantes para toda la familia."
    },
    {
      "title": "Guías de Turismo",
      "desc": "Descubre la región con la ayuda de expertos locales. Conoce guías de turismo que te llevarán a explorar los lugares más fascinantes."
    },
    {
      "title": "Aventura",
      "desc": "Vive emociones fuertes en la naturaleza. Explora opciones de aventura que te permitirán disfrutar de actividades al aire libre llenas de adrenalina."
    },
    {
      "title": "Agro y eco turismo",
      "desc": "Conecta con la tierra y la sostenibilidad. Descubre experiencias de agroturismo y ecoturismo que te acercarán a la naturaleza y la agricultura local."
    },
    {
      "title": "Planes o Rutas",
      "desc": "Diseña tu itinerario perfecto. Explora planes y rutas que te guiarán a través de los lugares más destacados de la región."
    },
    {
      "title": "Artesanías",
      "desc": "Descubre la creatividad local en cada detalle. Explora tiendas de artesanías que exhiben obras únicas y tradicionales de la región."
    },
    {
      "title": "Eventos",
      "desc": "Sumérgete en la vida cultural y social de la región. Descubre eventos que te ofrecen la oportunidad de disfrutar de experiencias únicas y memorables."
    },
    {
      "title": "Transporte",
      "desc": "Descubre opciones de transporte que te llevarán a todos los rincones de la región y te permitirán explorar de manera cómoda y eficiente."
    }
  ]

  serviShuffle: any = [...this.servi];
  randomuni = [...this.muni]; // Copia de los municipios

  tilesDataCategorias: Municipio[] = []; // Array de categorías


  isDragging = false; startX!: number; startScrollLeftMuni: any; velocityX:any; startScrollLeftServi: any;  startScrollLeftPresta: any;  startScrollLeftAtrac: any; // Variables para el scroll horizontal
  tilesData: Municipio[] = []; // Array de municipios
  scrollEndThreshold = 150; // Ajusta según sea necesario
  @ViewChild("carouselMuni") carouselMuni!: ElementRef;
  @ViewChild("carouselServi") carouselServi!: ElementRef;
  @ViewChild("carouselPresta") carouselPresta!: ElementRef;
  @ViewChild("carouselAtrac") carouselAtrac!: ElementRef;
  @ViewChild('leftButtonMuni') leftButtonMuni!: ElementRef;
  @ViewChild('rightButtonMuni') rightButtonMuni!: ElementRef;
  @ViewChild('leftButtonServi') leftButtonServi!: ElementRef;
  @ViewChild('rightButtonServi') rightButtonServi!: ElementRef;
  @ViewChild('leftButtonPresta') leftButtonPresta!: ElementRef;
  @ViewChild('rightButtonPresta') rightButtonPresta!: ElementRef;
  @ViewChild('leftButtonAtrac') leftButtonAtrac!: ElementRef;
  @ViewChild('rightButtonAtrac') rightButtonAtrac!: ElementRef;

[key: string]: any;

buttonScroll(direction: string, buttonId: string, carouselName: string) {
  const carousel = this[carouselName];

  if (carousel) {
    carousel.nativeElement.style.scrollBehavior = 'smooth';
    const scrollAmount = carousel.nativeElement.clientWidth * 1;

    if (
      (buttonId.startsWith('left') && direction === 'left') ||
      (buttonId.startsWith('right') && direction === 'right')
    ) {
      const scrollDirection = buttonId.startsWith('left') ? -scrollAmount : scrollAmount;
      carousel.nativeElement.scrollLeft += scrollDirection;
    }
  }
}


  trackByFn(index: number, item: any): number {
    return item.id; // Utiliza un identificador único para tus elementos
  }

  checkScrollEnd(element: ElementRef, leftButton: ElementRef, rightButton: ElementRef) {
    const el = element.nativeElement;
    const scrollEnd = el.scrollWidth - el.clientWidth;
    const leftBtn = leftButton.nativeElement;
    const rightBtn = rightButton.nativeElement;

    rightBtn.classList.toggle('hidden', el.scrollLeft >= scrollEnd - this.scrollEndThreshold);
    rightBtn.classList.toggle('block', el.scrollLeft < scrollEnd - this.scrollEndThreshold);
    leftBtn.classList.toggle('hidden', el.scrollLeft === 0);
    leftBtn.classList.toggle('block', el.scrollLeft > this.scrollEndThreshold);
  }




  ngAfterViewChecked(): void {
  this.checkScrollEnd(this.carouselMuni, this.leftButtonMuni, this.rightButtonMuni);
  this.checkScrollEnd(this.carouselServi, this.leftButtonServi, this.rightButtonServi);
  this.checkScrollEnd(this.carouselPresta, this.leftButtonPresta, this.rightButtonPresta);
  this.checkScrollEnd(this.carouselAtrac, this.leftButtonAtrac, this.rightButtonAtrac);
  }

  private async fetchUrls(): Promise<{ [key: string]: string }> {
    const urlsByMunicipio: { [key: string]: string } = {};

    await Promise.all(this.randomuni.map(async (municipio) => {
      const pathReference = ref(this.storage, `Banner/${municipio}.webp`);

      try {
        const url = await getDownloadURL(pathReference);
        urlsByMunicipio[municipio] = url;
      } catch (error:any) {
        if (error.code === 'storage/object-not-found') {
          console.log(`File doesn't exist for ${municipio}`);
        } else {
          console.error(`Error fetching URL for ${municipio}:`, error);
        }
      }
    }));
    console.log("urlsByMunicipio: ", urlsByMunicipio)
    return urlsByMunicipio;
  }



  ngAfterViewInit(): void {
    // Configura tu mapa aquí...

    // Intenta obtener el array de URLs de imágenes de IndexedDB
    this.indexedDB.getImages("imagesMuni").then((cachedUrlsArray) => {
      if (cachedUrlsArray && cachedUrlsArray.length > 0) {
    // Convertir el arreglo de URLs a un objeto por municipio
      const urlsByMunicipio: { [key: string]: string } = cachedUrlsArray.reduce((acc: { [key: string]: string }, url, index) => {
        acc[this.randomuni[index]] = url;
        return acc;
      }, {});
        this.setupTilesData(urlsByMunicipio);
      } else {

        // Si no están en caché, obtén las URLs y guárdalas en IndexedDB
        console.log("cacheMuni not taked i need firebase")
        this.fetchUrls().then((urls:any) => {
          console.log(urls)
          console.log(Array.isArray(urls))
          // Guarda el array completo de URLs en IndexedDB
          this.indexedDB.saveImages(urls,"imagesMuni").then(() => {
            this.setupTilesData(urls);
          }).catch(error => {
            console.error('Error al guardar imágenes en IndexedDB', error);
          });
        });
      }
    }).catch(error => {
      console.error('Error al recuperar imágenes de IndexedDB', error);
    });
  }


  private setupTilesData(urlsByMunicipio: { [key: string]: string }) {
    console.log(urlsByMunicipio)
    this.tilesData = this.randomuni.map((municipio) => ({
      title: municipio,
      img: urlsByMunicipio[municipio], // Accede a la URL directamente usando la clave del municipio
      alt: `${municipio} image`,
    }));

    console.log("this.tilesData: ", this.tilesData)
  }



  //? Creamos un método para obtener el nombre del elemento seleccionado a la hora de hacer click sobre la imágen, y a su vez de enviar la información al componente al que vamos a redireccionar la vista.
  enviarInformacion(municipio: any) {
    this.homeService.sendHomeMunicipioData = municipio; //*Enviamos el municipio seleccionado por medio de observables.
    this.router.navigate(['/municipios/', municipio]); //*Redireccionamos al componente donde enviamos el elemento.
  }

}
