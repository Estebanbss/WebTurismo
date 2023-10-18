import { Component, OnInit } from '@angular/core';
import { Map, marker, tileLayer } from 'leaflet';
import { Observable } from 'rxjs';
import { HomeService } from 'src/app/modules/home/services/home.service';

@Component({
  selector: 'app-municipios',
  templateUrl: './municipios.component.html',
  styleUrls: ['./municipios.component.css']
})
export class MunicipiosComponent implements OnInit {

  //? Observable con el que vamos a recibir la información compartida desde el componente listar
  private nombreMunicipio$: Observable<string>;

  nombreMunicipio!: string; //? Almacena el nombre del municipio que trae el observable.

  titles = [
    //************************************* */
    {
      headingText: '¿Donde dormir?',
      routerlink: "/home"
    },

    //************************************* */

    {
      headingText: '¿Donde comer?',
      routerlink: "/home"
    },

    //************************************* */

    {
      headingText: '¿A Donde ir?',
      routerlink: "/home"
    },

    //************************************* */

    {
      headingText: 'Cosas que hacer',
      routerlink: "/home"
    },

    //************************************* */
  ]

  selectedServices = new Set<string>();// Conjunto de servicios seleccionados

  toggleService(service: string) { // Función para seleccionar o deseleccionar un servicio
    if (this.selectedServices.has(service)) {
      this.selectedServices.delete(service); // Deselecciona el servicio si ya está seleccionado
    } else {
      this.selectedServices.add(service); // Selecciona el servicio si no está en el conjunto
    }
  }

  clearSelectedServices() { // Función para deseleccionar todos los servicios
    this.selectedServices.clear(); // Limpia el conjunto de servicios seleccionados
  }

  botonActivo: string = ''; // Variable para guardar el botón activo

  activarBoton(boton: string) {// Función para activar el botón seleccionado
    this.botonActivo = boton;// Guarda el botón seleccionado en la variable
  }

  clearBotonActivo() {// Función para desactivar el botón seleccionado
    this.botonActivo = '';// Limpia la variable
  }

  constructor(
    private homeService: HomeService, // Inyecta el servicio HomeService del Modulo Home
  ) {
    this.nombreMunicipio$ = this.homeService.sharingHomeMunicipio; //Compartimos el dato enviado desde el otro componente por medio del observable
   }// Constructor

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



  turnS: string = '';// Variable para guardar el servicio seleccionado

  turnServicesOption(value: string) { // Función para guardar el servicio seleccionado
    this.turnS = value;// Guarda el servicio seleccionado en la variable
  }

  servicesSLEEP: string[] = [// Array de servicios de DONDE DORMIR
    "Alojamiento Urbano",
    "Alojamiento Rural",
  ]

  servicesEAT: string[] = [// Array de servicios de DONDE COMER
    "Restaurantes",
    "Tiendas de café",
    "Antojos típicos",
  ]
  servicesGO: string[] = [// Array de servicios de A DONDE IR
    "Sitio Natural",
    "Patrimonio Cultural",
    "Miradores",
    "Parques naturales",
  ]
  servicesDO: string[] = [// Array de servicios de COSAS QUE HACER
    "Agencias de viajes",
    "Centro recreativo",
    "Guías de turismo",
    "Aventura",
    "Agro y ecoturismo",
    "Planes y rutas",
    "Artesanías",
    "Eventos",
    "Transporte"
  ]





  select: string = "Garzón";// Variable para guardar el municipio seleccionado

  turnMuni: boolean = false;// Variable para guardar el estado de la lista de municipios

  expandListMuni() {// Función para expandir la lista de municipios
    this.turnMuni = !this.turnMuni;// Función para expandir la lista de municipios
  }
  turnServices: boolean = false;// Variable para guardar el estado de la lista de servicios

  expandListServi() {
    this.turnServices = !this.turnServices;// Función para expandir la lista de servicios
  }

  ngOnInit(): void {// Función que se ejecuta al iniciar el componente
    //* Llamamos al método que nos trae la información del nombre del municipio desde el otro componente.
    this.recibirInformacion();
  }

  ngAfterViewInit() {// Función que se ejecuta después de cargar la vista

    const map = new Map('map').setView([51.505, -0.09], 13);// Crea el mapa

    // Agrega la capa de mapa
    tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    }).addTo(map);// Agrega la capa de mapa

    marker([51.505, -0.09]).addTo(map)// Agrega un marcador

  }

  //? Método para recibir los datos por medio del observable
  recibirInformacion() {
    //Primero nos suscribimos a nuestro observable para obtener los datos del elemento que queremos
    this.nombreMunicipio$.subscribe((municipio) => {
      //Pasamos los datos del Observable a nuestra propiedad nativa para mejor manipulación de datos
      this.nombreMunicipio = municipio;
    })

    console.log(this.nombreMunicipio);
  }

}

