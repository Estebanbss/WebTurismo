import { getDownloadURL, getStorage, ref } from '@angular/fire/storage';
import { Component, OnInit, ElementRef, ViewChild, HostListener, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/modules/home/services/home.service';
import { Municipio } from 'src/app/core/common/municipio-model';
import { Map, marker, tileLayer } from 'leaflet';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private homeService: HomeService, // Inyecta el servicio HomeService
    private router: Router,
    private titleService:Title,// Inyecta el servicio ActivatedRoute
  ) {


  }
  ngOnInit(): void {
    this.titleService.setTitle('Pal\'Huila - Explora!');

  }

  storage = getStorage(); // Variable para almacenar el storage de Firebase
  dataUser: any; // Variable para almacenar los datos del usuario
  admin: string = 'juanesbs2003@hotmail.com'; // Correo del administrador|

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
      "title": "Agencias de Viajes",
      "desc": "Planifica tu próxima aventura con expertos en viajes. Descubre agencias de viajes que te ayudarán a diseñar la escapada perfecta."
    },
    {
      "title": "Centro recreativo",
      "desc": "Disfruta de entretenimiento y diversión en un solo lugar. Explora centros recreativos que ofrecen actividades emocionantes para toda la familia."
    },
    {
      "title": "Guias de Turísmo",
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
    }
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

    tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    }).addTo(map);

    marker([2.19389995105747,-75.6303756116717]).addTo(map)


    const buttons = document.querySelectorAll("button");// Obtener todos los botones
    buttons.forEach((button) => {// Por cada botón
      console.log(button.id);// Mostrar en consola el id del botón //TODO: esto lo hacia para tener en cuenta los botones para hacer el desplazamiento del scroll por boton como en el draggable
    });


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

  logOut(): void {// Método para cerrar sesión
    this.homeService // Cierra la sesión
      .cerrarSesion()// Llama al método cerrarSesion del servicio HomeService
      .then(() => {// Si se cierra la sesión
        // Si se cierra la sesión
        this.router.navigate(['auth/login']); // Redirige al login
      })
      .catch((error) => console.log(error)); // Si no se cierra la sesión, muestra el error
  }
}
