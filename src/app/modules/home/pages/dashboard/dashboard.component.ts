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
    private detalle: DetalleService
  ) {

  }
  ngOnInit(): void {
    this.titleService.setTitle('Pal\'Huila - Explora!');;
    this.modalService.setProfileHeader(false);
    this.serviShuffle.sort(this.comparacionAleatoria);
    this.randomuni.sort(this.comparacionAleatoria);
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
  @HostListener("mousedown", ["$event"])


  dragStart = (event: MouseEvent) => {


    if (event instanceof MouseEvent && event.target === this.carouselMuni.nativeElement) {
      this.carouselMuni.nativeElement.style.scrollBehavior = 'auto';
      this.isDragging = true;
      this.velocityX = 0;
      this.startX = event.pageX;
      this.startScrollLeftMuni = this.carouselMuni.nativeElement.scrollLeft;
    }

    if (event instanceof MouseEvent && event.target === this.carouselServi.nativeElement) {
      this.carouselServi.nativeElement.style.scrollBehavior = 'auto';
      this.isDragging = true;
      this.velocityX = 0;
      this.startX = event.pageX;
      this.startScrollLeftServi = this.carouselServi.nativeElement.scrollLeft;
    }
    if (event instanceof MouseEvent && event.target === this.carouselPresta.nativeElement) {
      this.carouselPresta.nativeElement.style.scrollBehavior = 'auto';
      this.isDragging = true;
      this.velocityX = 0;
      this.startX = event.pageX;
      this.startScrollLeftPresta = this.carouselPresta.nativeElement.scrollLeft;
    }
    if (event instanceof MouseEvent && event.target === this.carouselAtrac.nativeElement) {
      this.carouselAtrac.nativeElement.style.scrollBehavior = 'auto';
      this.isDragging = true;
      this.velocityX = 0;
      this.startX = event.pageX;
      this.startScrollLeftAtrac = this.carouselAtrac.nativeElement.scrollLeft;
    }

  };

@HostListener("mousemove", ["$event"])
dragging = (event: MouseEvent) => {
  if (!this.isDragging) return;

  let pageX: number | undefined;

  if (event instanceof MouseEvent) {
    pageX = event.pageX;
  }
  const delta = pageX! - this.startX;

  if (pageX !== undefined && event.target === this.carouselMuni.nativeElement && this.isDragging)  {
    this.carouselMuni.nativeElement.classList.add("dragging");
    this.carouselMuni.nativeElement.style.scrollBehavior = 'auto';

    this.velocityX = delta;
    this.carouselMuni.nativeElement.scrollLeft = this.startScrollLeftMuni - delta;
  }

  if (pageX !== undefined && event.target === this.carouselServi.nativeElement && this.isDragging)  {
    this.carouselServi.nativeElement.classList.add("dragging");
    this.carouselServi.nativeElement.style.scrollBehavior = 'auto';

    this.velocityX = delta;
    this.carouselServi.nativeElement.scrollLeft = this.startScrollLeftServi - delta;
  }

  if (pageX !== undefined && event.target === this.carouselPresta.nativeElement && this.isDragging)  {
    this.carouselPresta.nativeElement.classList.add("dragging");
    this.carouselPresta.nativeElement.style.scrollBehavior = 'auto';

    this.velocityX = delta;
    this.carouselPresta.nativeElement.scrollLeft = this.startScrollLeftPresta - delta;
  }

  if (pageX !== undefined && event.target === this.carouselAtrac.nativeElement && this.isDragging)  {
    this.carouselAtrac.nativeElement.classList.add("dragging");
    this.carouselAtrac.nativeElement.style.scrollBehavior = 'auto';

    this.velocityX = delta;
    this.carouselAtrac.nativeElement.scrollLeft = this.startScrollLeftAtrac - delta;
  }

};

@HostListener("mouseup", ["$event"])
dragStop = (event: MouseEvent) => {


  this.isDragging = false;

  if (this.carouselMuni.nativeElement.contains(event.target as Node)) {
    if (!(event instanceof MouseEvent) || event.target !== this.carouselMuni.nativeElement) return;
    this.carouselMuni.nativeElement.classList.remove("dragging");

  }
  if (this.carouselServi.nativeElement.contains(event.target as Node)) {
    if (!(event instanceof MouseEvent) || event.target !== this.carouselServi.nativeElement) return;
    this.carouselServi.nativeElement.classList.remove("dragging");

  }
  if (this.carouselPresta.nativeElement.contains(event.target as Node)) {
    if (!(event instanceof MouseEvent) || event.target !== this.carouselPresta.nativeElement) return;
    this.carouselPresta.nativeElement.classList.remove("dragging");

  }
  if (this.carouselAtrac.nativeElement.contains(event.target as Node)) {
    if (!(event instanceof MouseEvent) || event.target !== this.carouselAtrac.nativeElement) return;
    this.carouselAtrac.nativeElement.classList.remove("dragging");

  }
};

[key: string]: any;

buttonScroll(direction: string, buttonId: string, carouselName: string) {


  // Accede dinámicamente a la propiedad 'carousel' de la instancia actual
  const carousel = this[carouselName];
  console.log(carouselName)

  if (carousel) {
    carousel.nativeElement.style.scrollBehavior = 'smooth';
    const scrollAmount = carousel.nativeElement.clientWidth * 1;

    if (buttonId === 'leftMuni' && direction === 'left') {
      carousel.nativeElement.scrollLeft -= scrollAmount;
    } else if (buttonId === 'rightMuni' && direction === 'right') {
      carousel.nativeElement.scrollLeft += scrollAmount;
    }

    if (buttonId === 'leftServi' && direction === 'left') {
      carousel.nativeElement.scrollLeft -= scrollAmount;
    } else if (buttonId === 'rightServi' && direction === 'right') {
      carousel.nativeElement.scrollLeft += scrollAmount;
    }
    if (buttonId === 'leftPresta' && direction === 'left') {
      carousel.nativeElement.scrollLeft -= scrollAmount;
    } else if (buttonId === 'rightPresta' && direction === 'right') {
      carousel.nativeElement.scrollLeft += scrollAmount;
    }
    if (buttonId === 'leftAtrac' && direction === 'left') {
      carousel.nativeElement.scrollLeft -= scrollAmount;
    } else if (buttonId === 'rightAtrac' && direction === 'right') {
      carousel.nativeElement.scrollLeft += scrollAmount;
    }
  }
}

  trackByFn(index: number, item: any): number {
    return item.id; // Utiliza un identificador único para tus elementos
  }

  checkScrollEnd() {
    const muni = this.carouselMuni.nativeElement;
    const servi = this.carouselServi.nativeElement;
    const presta = this.carouselPresta.nativeElement;
    const atrac = this.carouselAtrac.nativeElement;
    const scrollEndMuni = muni.scrollWidth - muni.clientWidth;
    const scrollEndServi = servi.scrollWidth - servi.clientWidth;
    const scrollEndPresta = presta.scrollWidth - presta.clientWidth;
    const scrollEndAtrac = atrac.scrollWidth - atrac.clientWidth;
    const leftButtonMuni = this.leftButtonMuni.nativeElement;
    const rightButtonMuni = this.rightButtonMuni.nativeElement;
    const leftButtonServi = this.leftButtonServi.nativeElement;
    const rightButtonServi = this.rightButtonServi.nativeElement;
    const leftButtonPresta = this.leftButtonPresta.nativeElement;
    const rightButtonPresta = this.rightButtonPresta.nativeElement;
    const leftButtonAtrac = this.leftButtonAtrac.nativeElement;
    const rightButtonAtrac = this.rightButtonAtrac.nativeElement;

        // Lógica para servi
        rightButtonServi.classList.toggle('hidden', servi.scrollLeft >= scrollEndServi - this.scrollEndThreshold);
        rightButtonServi.classList.toggle('block', servi.scrollLeft < scrollEndServi - this.scrollEndThreshold);
        leftButtonServi.classList.toggle('hidden', servi.scrollLeft === 0);
        leftButtonServi.classList.toggle('block', servi.scrollLeft > this.scrollEndThreshold);

    // Lógica para muni
    rightButtonMuni.classList.toggle('hidden', muni.scrollLeft >= scrollEndMuni - this.scrollEndThreshold);
    rightButtonMuni.classList.toggle('block', muni.scrollLeft < scrollEndMuni - this.scrollEndThreshold);
    leftButtonMuni.classList.toggle('hidden', muni.scrollLeft === 0);
    leftButtonMuni.classList.toggle('block', muni.scrollLeft > this.scrollEndThreshold);

    // Lógica para presta
    rightButtonPresta.classList.toggle('hidden', presta.scrollLeft >= scrollEndPresta - this.scrollEndThreshold);
    rightButtonPresta.classList.toggle('block', presta.scrollLeft < scrollEndPresta - this.scrollEndThreshold);
    leftButtonPresta.classList.toggle('hidden', presta.scrollLeft === 0);
    leftButtonPresta.classList.toggle('block', presta.scrollLeft > this.scrollEndThreshold);

    // Lógica para atrac
    rightButtonAtrac.classList.toggle('hidden', atrac.scrollLeft >= scrollEndAtrac - this.scrollEndThreshold);
    rightButtonAtrac.classList.toggle('block', atrac.scrollLeft < scrollEndAtrac - this.scrollEndThreshold);
    leftButtonAtrac.classList.toggle('hidden', atrac.scrollLeft === 0);
    leftButtonAtrac.classList.toggle('block', atrac.scrollLeft > this.scrollEndThreshold);



  }

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    this.checkScrollEnd();
  }


  private async fetchUrls(): Promise<string[]> {
    // Método para obtener los URLs de las imágenes
    const promises: Promise<string>[] = this.randomuni.map(async (municipio) => {// Por cada municipio
      const pathReference = ref(this.storage, `Banner/${municipio}.webp`);// Obtener la referencia del storage
      try {// Intentar obtener el URL
        const url = await getDownloadURL(pathReference);// Obtener el URL
        return url;// Retornar el URL
      } catch (error:any) {// Si no se puede obtener el URL
        if (error.code === 'storage/object-not-found') {// Si el error es porque no existe el archivo
          console.log(`File doesn't exist for ${municipio}`);// Mostrar en consola que no existe el archivo
        }// Si no es porque no existe el archivo
        return ''; // Retornar una cadena vacía en caso de error
      }
    });

    return Promise.all(promises);// Retornar los URLs
  }


  ngAfterViewInit(): void {// Después de inicializar la vista


    const map = new Map('map').setView([2.19389995105747,-75.6303756116717],13);

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',  {
    }).addTo(map);

    marker([2.19389995105747,-75.6303756116717]).addTo(map)


    this.fetchUrls().then((urls) => {// Obtener los URLs de las imágenes
      // Almacenar los URLs en tilesData
      this.tilesData = this.randomuni.map((municipio, index) => ({// Por cada municipio
        title: municipio,// Título del municipio
        img: urls[index],// URL de la imagen
        alt: `${municipio}image`,// Texto alternativo de la imagen
      }));
    });


  }

  //? Creamos un método para obtener el nombre del elemento seleccionado a la hora de hacer click sobre la imágen, y a su vez de enviar la información al componente al que vamos a redireccionar la vista.
  enviarInformacion(municipio: any) {
    //* Primero obtenemos el elemento que queremos.
    //console.log(municipio);
    /*
    routerLink="/municipios"
    */
    this.homeService.sendHomeMunicipioData = municipio; //*Enviamos el municipio seleccionado por medio de observables.
    this.router.navigate(['/municipios/', municipio]); //*Redireccionamos al componente donde enviamos el elemento.
  }

}
