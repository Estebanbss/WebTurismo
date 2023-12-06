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
import { AuthService } from 'src/app/core/services/auth.service';


  @Component({
    selector: 'app-municipios',
    templateUrl: './municipios.component.html',
    styleUrls: ['./municipios.component.css'],

  })


  export class MunicipiosComponent implements OnInit {
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


    imgDefault: string ="https://firebasestorage.googleapis.com/v0/b/centurhuila-b9e47.appspot.com/o/Banner%2FDefaultImg.png?alt=media&token=d39c6440-fc6f-4313-ad59-92efc776f114&_gl=1*16fm2h0*_ga*MjA0ODg4MTY1Mi4xNjk4NTk1OTkz*_ga_CW55HF8NVT*MTY5OTQxMTQ2Ni4xOS4xLjE2OTk0MTE1MDkuMTcuMC4w";
    //Página donde estamos

    page: number = 1;

    inputext: string = '';

    map!: Map;

    //? Observable con el que vamos a recibir la información compartida desde el componente listar
    private nombreMunicipio$: Observable<string>;

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

    //? -> Unique ID para cada Usuario
    uid!: string;

    //? -> Objeto de tipo User guardado en la BD
    userDetails: any;

    private nombreMunicipioSubscription!: Subscription;
    private municipiosSubscription!: Subscription;
    private modalDataSubscription!: Subscription;
    private allSubscriptions!: Subscription;

    // latitud: number = 2.204537221801455;
    // longitud: number = -75.62682422721537;

    // set setMunicipios(value: any) {
    //   this.municipios = value;
    //   // if (this.municipios) {

    //   // }
    // }

    // set setMunicipio(value: any) {
    //   this.municipio = value;
    //   if (this.municipio) {
    //     //this.cargarMapa();
    //   }
    // }


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
      private authService: AuthService,
      private homeService: HomeService, // Inyecta el servicio HomeService del Modulo Home
      private mostrarMunicipioService: MostrarMunicipioService,
      private route: ActivatedRoute,
      private textService: Title,
      private router: Router,
      private modalService: ModalServiceService,
      private detalleService: DetalleService
    ) {



      this.route.params.subscribe(params => this.cambioURL = params['id']);

        // Puedes utilizar this.municipioId para realizar acciones basadas en el parámetro.


      this.nombreMunicipio$ = this.homeService.sharingHomeMunicipio; //Compartimos el dato enviado desde el otro componente por medio del observable
      this.textService.setTitle("Pa'lHuila - Municipios!")
      //? Inicializamos la propiedad municipio de tipo Object que va a ser la que vamos a mostrar en el html
      this.arrayMunicipio = {
        //id -> Nos lo da firebase
        name: '',
        zona: '',
        descripcion: '',
        poblacion: '',
        gentilicio: '',
        clima: '',
        servicios: '',
        fiestasEventos: '',
        hechosHistoricos: '',
        sitioWeb: '',
        facebook: '',
        instagram: '',
        twitter: '',
        youtube: '',
        latitud: 0,
        longitud: 0,
        googleMaps: '',
        pathImages: [], // -> lo conseguimos en la inserción de imágenes
        meGusta: 0, // -> # de Me gustas en la App
        pathImagePortada: {
          path: '',
          url: ''
        }
      }


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
      'Agrado',
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


    select: string = "Garzón";// Variable para guardar el municipio seleccionado

    turnMuni!: boolean// Variable para guardar el estado de la lista de municipios



    ngOnInit(): void {// Función que se ejecuta al iniciar el componente
      //* Llamamos al método que nos trae la información del nombre del municipio desde el otro componente y el arreglo de objetos de tipo municipio desde la BD.
      this.recibirInformacion();

      this.modalDataSubscription = this.modalService.modalTurnMuni$.subscribe((value) => {

          if(value === true){
            this.turnMuni === true || null ? this.turnMuni = false : this.turnMuni = true;
          }
          else{
            this.turnMuni = false
          }

      });
    }

    toID() {
      const List = document.getElementById("ListID");
      window.scrollTo({
        top: List!.offsetTop,
        behavior: "smooth" // Para un desplazamiento suave (con animación), o "auto" para un desplazamiento instantáneo.
      });
    }


    //? Método para recibir los datos del observable y de la BD
    recibirInformacion() {
      //*Primero nos suscribimos a nuestro observable para obtener los datos del elemento que queremos
      this.nombreMunicipioSubscription = this.nombreMunicipio$.subscribe((municipio) => {
        //Pasamos el dato del Observable a nuestra propiedad nativa para mejor manipulación de datos
        this.nombreMunicipio = municipio;
      })
      //console.log(this.nombreMunicipio);
      //* Llamamos a nuestros datos de los municipios desde la BD
      //* -> Aquí nos suscribimos a nuestro observable desde el método de nuestro servicio para que esté atento a los cambios que se hagan a tiempo real.
      this.municipiosSubscription = this.mostrarMunicipioService.obtenerMunicipios().subscribe(data => {
        // data nos trae un arreglo con el conjunto de elemento de tipo Object - Arreglo de Objetos
        this.municipios = data; //Pasamos la información a una propiedad nativa de la clase para hacer el Banding
        //console.log(this.municipios);
        if(this.municipios) {
          this.nombreMunicipioSubscription.unsubscribe();
          this.municipiosSubscription.unsubscribe();
          // console.log(this.nombreMunicipioSubscription.closed);
          // console.log(this.municipiosSubscription.closed);
          // console.log(this.municipios);
          //? Disparar el método para filtrar el municipio con que podamos escoger sólo el municipio que queremos mostrar.
          //this.filtrarMunicipio();//El método se dispara aquí para esperar a la promesa que nos llena el arreglo de municipios.
          this.cambiarMunicipio(this.cambioURL);
        }
      })

    } //? -> Fin Recibir Información

    //? -> Método para filtrar el municipio que queremos mostrar dependiendo de lo que elija el usuario
    filtrarMunicipio() {
      //this.nombreMunicipio -> Nombre del municipio por el que vamos a buscar
      //this.municipios -> Arreglo de objetos de tipo Municipio
      //this.municipio -> Objeto de tipo Municipio para almacenar sólo el elemento que quiero mostrar en el html
      // console.log(this.nombreMunicipio);
      // console.log(this.municipios);
      // console.log(this.municipio);

      this.arrayMunicipio = this.municipios.filter((municipio) => {

        //* Hacemos el proceso de quitar espacios, tíldes, caracteres especiales y colocar todo en minúscula antes de hacer la comparación.
        this.nombreMunicipio = this.nombreMunicipio.trim();
        let nameMunicipio = municipio.name.trim(); // Quitamos espacios
        //Filtro para quitar tíldes y caracteres especiales
        function quitarTildes(str: any) {
          return str
            .replace(/[áäâà]/g, 'a')
            .replace(/[éëêè]/g, 'e')
            .replace(/[íïîì]/g, 'i')
            .replace(/[óöôò]/g, 'o')
            .replace(/[úüûù]/g, 'u')
            .replace(/[ñ]/g, 'n')
            .replace(/[ç]/g, 'c');
        }
        nameMunicipio = quitarTildes(nameMunicipio.toLowerCase()); // Convertir a minuscula y quitar tildes
        this.nombreMunicipio = quitarTildes(this.nombreMunicipio.toLowerCase());

        // console.log(nameMunicipio);
        // console.log(this.nombreMunicipio);

        //Comparación
        if (this.nombreMunicipio.localeCompare(nameMunicipio) === 0) {
          return true; //Retornamos el caso de éxito para filter(), se incluye el elemento actual
        }

        return false;

      });

      //* Validación en caso de que el municipio elejido no exísta(Improbable), es necesario mostrar algo.
      // console.log(this.municipio.length);
      // console.log(this.municipio);
      if(this.arrayMunicipio.length === 0) { //Si está vacío

        this.municipios.forEach((muni) => {
          //console.log(muni);
          let nameMuni = muni.name.trim();
          if(nameMuni === 'Garzón' || nameMuni === 'garzón' ) {
            this.arrayMunicipio.push(muni);
          }
        })

      }

      //* Atrapamos el objeto que queremos mostrar
      this.municipio = this.arrayMunicipio[0];

      //* Le damos el nombre del municipio selecionado para que aparesca como elegído
      this.select = this.municipio.name;

        //* Se dispara el método para traer los Prestadores y Atractivos del municipio Solicitado
        this.datosPrestadoresYAtractivos(this.municipio.name);

      //* Hacemos validación de punto decimal para ambos números
      //* En este caso nos devuelte true en caso de que ambos contengan decimales
      const num1 = this.hasDecimalPoint(this.municipio.latitud);
      const num2 = this.hasDecimalPoint(this.municipio.longitud);

      //*En caso de que ambas coordenadas no presenten problema con los puntos decimal ejecutamos el método del Mapa
      if(num1 && num2) {
        //*Mapa - Ejecutamos la lógica del mapa ya teniendo los datos que queremos mostrar
        this.cargarMapa();
      }
      this.router.navigate(['/municipios/', this.municipio.name]);
      //console.log(this.municipio); //Objeto que retrona con todos los valores
    } //? -> Fin Método filtrar Municipio

    //? -> Método para saber si tienen punto decimal
    hasDecimalPoint(value: any): boolean {
      //console.log(value);
      return value.toString().includes('.');
    } //?- Fin Método

    //?- Método para cargar el Mapa
    cargarMapa() {
      if (!this.map) { // Verificar si el mapa ya está inicializado
        this.map = new Map('map').setView([this.municipio.latitud, this.municipio.longitud], 13);

        // Agregar capa de tiles
        tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',  {
        }).addTo(this.map);

        // Agregar un marcador
        marker([this.municipio.latitud, this.municipio.longitud]).addTo(this.map)
          .bindPopup(this.municipio.name)
          .openPopup();


      } else { // Si el mapa ya está inicializado, simplemente cambia el centro y el marcador
        this.map.setView([this.municipio.latitud, this.municipio.longitud], 13);
        marker([this.municipio.latitud, this.municipio.longitud]).addTo(this.map)
          .bindPopup(this.municipio.name)
          .openPopup();
      }
    }//? -> Fin Método Cargar Mapa

    //? Método para cambiar de municipio
    cambiarMunicipio(nombre: any) {
      //console.log(nombre);
      //* Cambiamos el valor del select para que aparezca en la interfaz
      this.select = nombre;
      //* Se cambia el nombre por el que vamos a filtrar
      this.nombreMunicipio = nombre;
      //* Se restablece a la primera página
      this.page = 1;
      //* Filtramos el municipio que queremos mostrar
      this.filtrarMunicipio();
      this.inputext = '';
      this.router.navigate(['/municipios/', this.municipio.name]);
    }

    nombreAtractivo: string = ""
    //? -> Método para traer los datos desde la BD de Prestadores y Atractivos según el municipio
    datosPrestadoresYAtractivos(nombre: string) {



      // Inicializamos las llamadas
      const prestadores$ = this.mostrarMunicipioService.obtenerPrestadoresPorMunicipio(nombre);
      const prestadores2$ = this.mostrarMunicipioService.obtenerPrestadoresPorMunicipio2(nombre);
      const atractivos$ = this.mostrarMunicipioService.obtenerAtractivosPorMunicipio(nombre);
      const atractivos2$ = this.mostrarMunicipioService.obtenerAtractivosPorMunicipio2(nombre);

      // Nos suscribimos a todos los observables a la vez
      this.allSubscriptions = combineLatest([prestadores$, prestadores2$, atractivos$, atractivos2$]).subscribe(
        ([prestadoresData, prestadores2Data, atractivosData, atractivos2Data]) => {

          this.prestadores = [...prestadoresData, ...prestadores2Data];
          //console.log(this.prestadores);

          this.atractivos = [...atractivosData, ...atractivos2Data];
          //console.log(this.atractivos);

          // Ahora sí, puedes combinar los resultados
          this.prestadoresYAtractivos = [...this.prestadores, ...this.atractivos];
          // console.log(this.prestadoresYAtractivos);
          this.prestadoresYAtractivos = this.shuffleArray(this.prestadoresYAtractivos);
        }
      );

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
      this.router.navigate(['prestadores', this.capitalizeFirstLetter(this.nombreMunicipio), this.capitalizeFirstLetter(item.name)]);
    } else if ('bienOLugar' in item) { //*Validación para Atractivos
      this.router.navigate(['atractivos', this.capitalizeFirstLetter(this.nombreMunicipio), this.capitalizeFirstLetter(item.name)]);
    }
  }

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


  //? -> Método me gusta
  meGusta(item: any) {
    //*Item hace referencia al Prestador o Atractivo
    //console.log('Me gusta: ', item);

    //* Traigo el usuario actual que quiero actualizar con los meGusta
    this.authService.onAuthStateChanged((user, userDetails) => {
      if (user && userDetails) {
        this.uid = user.uid; //* uid -> Desde Firebase
        this.userDetails = userDetails; //* userDetails -> Objeto traido desde la BD de la colección users

        //?Aquí tengo que Actualizar el documento en la colección users
        //*Debemos definir en qué arreglo de MeGusta queremos guardar el resultado
        if ('servicios' in item) { //?Validación para Prestadores

        } else if ('bienOLugar' in item) { //?Validación para Atractivos
          //*Si el usuario ya tiene la propiedad no la agrega, de lo contrario lo hace y en ambos caso añade el sitio que le gusta
          if (!('atractivosMeGusta' in this.userDetails)) {
            this.userDetails.atractivosMeGusta = [item.id]; // Inicializa la propiedad si no existe
          } else {
            //? Se hace la validación de que si ya está guardado el id entonces no lo guarde, en ese caso lo quite.
            //this.userDetails.atractivosMeGusta = [];
            if (this.userDetails.atractivosMeGusta.includes(item.id)) {
              //*El ID ya existe en el arreglo.
              // Encuentra la posición del ID en el arreglo
              let indice = this.userDetails.atractivosMeGusta.indexOf(item.id);
              // Elimina el elemento de esa posición
              this.userDetails.atractivosMeGusta.splice(indice, 1);
              console.log("ID eliminado del arreglo.");
            } else {
              //*El ID no se encuentra en el arreglo.
              this.userDetails.atractivosMeGusta.push(item.id); //Se Agrega el id que me gustó
              console.log("ID agregado al arreglo.");
            }
          }

          console.log(this.userDetails);

          //*Aquí se actualiza la información del objeto en la BD
          this.authService.actualizarUsuario(this.uid, this.userDetails).then(() => {
            console.log('Se actualizó con éxito a la Base de Datos');
          }).catch(() => {
            console.log('Ha ocurrido un error en la inserción a Base de Datos');
          }) //*Como último paso actualizamos el objeto

        }

      }
      this.authService.updateUserDetailsInLocalStorage(); //Agrega a localStorage los cambios
    });

  } //? -> MeGusta Final

  ngOnDestroy() {
      // Desuscribirse para evitar pérdidas de memoria
      if (this.allSubscriptions) {
          this.allSubscriptions.unsubscribe();
          this.modalDataSubscription.unsubscribe();
      }
  }
  toList() {
    const List = document.getElementById("InfoListaMunicipio");
    window.scrollTo({
      top: List!.offsetTop-70,
      behavior: "smooth" // Para un desplazamiento suave (con animación), o "auto" para un desplazamiento instantáneo.
    });
  }

  }

