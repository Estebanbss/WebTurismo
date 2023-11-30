  import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
  import { Map, marker, tileLayer } from 'leaflet';
  import { Title } from '@angular/platform-browser';
  import { Observable, combineLatest } from 'rxjs';
  import { HomeService } from 'src/app/core/services/home.service';
  import { MostrarMunicipioService } from '../../../core/services/mostrar-municipio.service';
  import { Municipio, PrestadorTuristico, AtractivoTuristico } from 'src/app/core/common/place.interface';
  import { Subscription } from 'rxjs';
  import { ActivatedRoute, Router } from '@angular/router';
import { ModalServiceService } from 'src/app/core/services/modal-service.service';
import { DetalleService } from 'src/app/core/services/detalle.service';


  @Component({
    selector: 'app-busqueda-prestador',
    templateUrl: './busqueda-atractivo.component.html',
    styleUrls: ['./busqueda-atractivo.component.css'],
  })


  export class BusquedaAtractivoComponent implements OnInit {
    @ViewChild('resultsList') resultsList!: ElementRef;
    @ViewChildren('resultItems') resultItems!: QueryList<ElementRef>;
    selectedIndex: number = -1;
    onKeydown(event: KeyboardEvent): void {
      switch (event.key) {
        case 'ArrowDown':
          this.navigateResults(1);

          break;
        case 'ArrowUp':
          this.navigateResults(-1);
          break;
        case 'Enter':
          if (this.selectedIndex !== -1) {
            if(this.item){
              this.navigate(this.item);
            }

          }
          break;
      }
    }



    item:any
    choose(item: any): void {
      this.item = item;
      console.log(item)
    }

    navigateResults(direction: number): void {
      this.selectedIndex += direction;
      if (this.selectedIndex < 0) {
        this.selectedIndex = 0; // No ir más arriba de la lista
      } else if (this.selectedIndex > this.prestadoresYAtractivos.length - 1) {
        this.selectedIndex = this.prestadoresYAtractivos.length - 1; // No ir más abajo de la lista
      }
      this.ensureVisible();
    }

    onContainerClick(event: MouseEvent): void {
      // Prevenir que el evento de clic se propague hasta el document
      event.stopPropagation();
    }


    ensureVisible(): void {
      this.resultItems.changes.subscribe(() => {
        const activeItem = this.resultItems.toArray()[this.selectedIndex];
        if (activeItem) {
          const container = this.resultsList.nativeElement;
          const itemElement = activeItem.nativeElement;

          // Verificar si el ítem está fuera de la vista
          const itemTop = itemElement.offsetTop;
          const itemBottom = itemTop + itemElement.offsetHeight;
          const containerTop = container.scrollTop;
          const containerBottom = containerTop + container.offsetHeight;

          if (itemTop < containerTop) {
            // Si el ítem está por encima de la vista
            container.scrollTop = itemTop;
          } else if (itemBottom > containerBottom) {
            // Si el ítem está por debajo de la vista
            container.scrollTop = itemBottom - container.offsetHeight;
          }
        }
      });
    }


    //TODO: Aquí vamos a poner una portada que indique varios Sitios
    imgDefault: string ="https://firebasestorage.googleapis.com/v0/b/centurhuila-b9e47.appspot.com/o/Banner%2FDefaultImg.png?alt=media&token=d39c6440-fc6f-4313-ad59-92efc776f114&_gl=1*16fm2h0*_ga*MjA0ODg4MTY1Mi4xNjk4NTk1OTkz*_ga_CW55HF8NVT*MTY5OTQxMTQ2Ni4xOS4xLjE2OTk0MTE1MDkuMTcuMC4w";
    //Página donde estamos

    page: number = 1;

    inputext: string = '';

    map!: Map;

    nombreMunicipio!: string; //? Almacena el nombre del municipio que se quiere mostrar.

    //? -> Propiedad para almacenar el arreglo de objetos de tipo Municipio
    municipios: Municipio[] = [];

    //? -> Propiedad para almacenar el arreglo de objetos de tipo prestador
    prestadores: PrestadorTuristico[] = [];

    //? -> Propiedad para almacenar el arreglo de objeto de tipo atractivo
    atractivos: AtractivoTuristico[] = [];

    //? -> Propiedad para almacenar el arreglo de objetos de tipo prestador y atractivo
    prestadoresYAtractivos: any;

    //? -> Arrelgo para filtrado que se va a mostrar en el html
    arrayMunicipio: any;

    //? -> Objeto de tipo municipio que vamos a mostrar
    municipio: any;

    //? -> Listado Prestadores
    litadoAtractivos: any;

    //? -> Manejar el estado de mi último documento
    private ultimoDocumento: any = null;

    private pestadoresSubsciption!: Subscription;
    private prestadores2Subscription!: Subscription;
    private modalDataSubscription!: Subscription;
    private allSubscriptions!: Subscription;


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
    pipeSelectedServices: String[] = []; //Son los valores que pasamos al pipe

    toggleService(service: string) { // Función para seleccionar o deseleccionar un servicio
      if (this.selectedServices.has(service)) {
        this.selectedServices.delete(service); // Deselecciona el servicio si ya está seleccionado
        //Convertimos el Set en un array para pasar al pipe
        this.pipeSelectedServices = [...this.selectedServices];
        this.page = 1;
        // console.log(this.pipeSelectedServices);
        // this.pipeSelectedServices.forEach(value => {
        //   console.log(value);
        // });
      } else {
        this.selectedServices.add(service); // Selecciona el servicio si no está en el conjunto
        //Convertimos el Set en un array para pasar al pipe
        this.pipeSelectedServices = [...this.selectedServices];
        this.page = 1;
        // console.log(this.pipeSelectedServices);
        // this.pipeSelectedServices.forEach(value => {
        //   console.log(value);
        // });
      }
    }

    clearSelectedServices() { // Función para deseleccionar todos los servicios
      this.selectedServices.clear(); // Limpia el conjunto de servicios seleccionados
      //Convertimos el Set en un array para pasar al pipe
      this.pipeSelectedServices = [...this.selectedServices];
      this.page = 1;
      // console.log(this.pipeSelectedServices);
      // this.pipeSelectedServices.forEach(value => {
      //   console.log(value);
      // });
    }

    botonActivo: string = ''; // Variable para guardar el botón activo

    activarBoton(boton: string) {// Función para activar el botón seleccionado
      this.botonActivo = boton;// Guarda el botón seleccionado en la variable
    }

    trackByFn(index: number, item: any): number {
      return item.id; // Utiliza un identificador único para tus elementos
    }

    clearBotonActivo() {// Función para desactivar el botón seleccionado
      this.botonActivo = '';// Limpia la variable
    }

    cambioURL: string = '';

    constructor(
      private homeService: HomeService, // Inyecta el servicio HomeService del Modulo Home
      private mostrarMunicipioService: MostrarMunicipioService,
      private route: ActivatedRoute,
      private textService: Title,
      private router: Router,
      private modalService: ModalServiceService,
      private detalleService: DetalleService
    ) {


      this.textService.setTitle("Pa'lHuila - Municipios!")


    }// Constructor



    turnS: string = '';// Variable para guardar el servicio seleccionado

    turnServicesOption(value: string) { // Función para guardar el servicio seleccionado
      this.turnS = value;// Guarda el servicio seleccionado en la variable
    }

    servicesSLEEP: string[] = [// Array de servicios de DONDE DORMIR
      "Alojamiento Urbano",
      "Alojamiento Rural",
    ]

    servicesEAT: string[] = [// Array de servicios de DONDE COMER
      "Restaurante",
      "Tienda de café",
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
      "Planes o rutas",
      "Artesanías",
      "Eventos",
      "Transporte"
    ]



    ngOnInit(): void {// Función que se ejecuta al iniciar el componente

      this.cargarDocumentos(); //* Para cargar los primeros 10 prestadores

    }

    cargarDocumentos() {
      this.pestadoresSubsciption = this.mostrarMunicipioService.obtenerAtractivosPaginacionUno().subscribe(documentos => {
        if (documentos.length > 0) {
          this.ultimoDocumento = documentos[documentos.length - 1];
          documentos = this.shuffleArray(documentos);
          this.litadoAtractivos = documentos;
          console.log("Nuevo ultimoDocumento: ", this.ultimoDocumento);
        } else {
          console.log("No hay más documentos para cargar");
        }
      });
    }

    cargarMasDocumentos() {
      this.prestadores2Subscription = this.mostrarMunicipioService.obtenerAtractivosPaginacion(true, this.ultimoDocumento).subscribe(documentos => {
        if (documentos.length > 0) {
          this.ultimoDocumento = documentos[documentos.length - 1];
          documentos = this.shuffleArray(documentos);
          this.litadoAtractivos = [...this.litadoAtractivos, ...documentos];
          console.log("Nuevo ultimoDocumento: ", this.ultimoDocumento);
        } else {
          console.log("No hay más documentos para cargar");
        }
      });
    }


  //* Es útil aún
  capitalizeFirstLetter(inputString: string): string {
    if (inputString.length === 0) {
      return inputString;
    }
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }


  //* Es útil aún
  navigate(item: any) {
    //Validamos hacia qué componente deseamos direccionar
    if ('servicios' in item) { //*Validación para Prestadores
      this.router.navigate(['prestadores', this.capitalizeFirstLetter(item.municipio), this.capitalizeFirstLetter(item.name)]);
    } else if ('bienOLugar' in item) { //*Validación para Atractivos
      this.router.navigate(['atractivos', this.capitalizeFirstLetter(item.municipio), this.capitalizeFirstLetter(item.name)]);
    }
  }

  //* Es útil aún
  //? -> Métdo para desorganizar el arreglo de forma aleatoria
  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
        // Generar un índice aleatorio
        const j = Math.floor(Math.random() * (i + 1));

        // Intercambiar elementos
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  //TODO: Revisar si es necesario
  ngOnDestroy() {
      // Desuscribirse para evitar pérdidas de memoria
      // if (this.pestadoresSubsciption) {
      //     this.pestadoresSubsciption.unsubscribe();
      //     this.prestadores2Subscription.unsubscribe();
      // }
  }


}

