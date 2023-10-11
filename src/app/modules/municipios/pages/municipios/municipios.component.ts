import { Component, OnInit } from '@angular/core';
import { Map, marker, tileLayer } from 'leaflet';

@Component({
  selector: 'app-municipios',
  templateUrl: './municipios.component.html',
  styleUrls: ['./municipios.component.css']
})
export class MunicipiosComponent implements OnInit{

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

  selectedServices = new Set<string>();

  toggleService(service: string) {
    if (this.selectedServices.has(service)) {
      this.selectedServices.delete(service); // Deselecciona el servicio si ya está seleccionado
    } else {
      this.selectedServices.add(service); // Selecciona el servicio si no está en el conjunto
    }
  }
  clearSelectedServices() {
    this.selectedServices.clear();
  }

  botonActivo: string = '';

  activarBoton(boton: string) {
    this.botonActivo = boton;
  }

  clearBotonActivo() {
    this.botonActivo = '';
   }

  constructor() {}
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

  services: string[] = [
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
    "Eventos"
  ]





  select:string ="Garzón";

  turnMuni:boolean = false;

  expandListMuni(){
    this.turnMuni = !this.turnMuni;
  }
  turnServices:boolean = false;

  expandListServi(){
    this.turnServices = !this.turnServices;
  }

  ngOnInit(): void {




  }

  ngAfterViewInit() {

    const map = new Map('map').setView([51.505, -0.09],13);

    tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    }).addTo(map);

    marker([51.505, -0.09]).addTo(map)


  }

}

