import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ModalServiceService } from 'src/app/core/services/modal-service.service';
import { Subscription } from 'rxjs';
import { Map, marker, tileLayer } from 'leaflet';
import { DetalleService } from 'src/app/core/services/detalle.service';
import axios from 'axios';
import { AuthService } from 'src/app/core/services/auth.service';
import { HomeService } from 'src/app/core/services/home.service';

@Component({
  selector: 'app-prestador',
  templateUrl: './prestador.component.html',
  styleUrls: ['./prestador.component.css'],

})
export class PrestadorComponent {
[x: string]: any;
  private modalDataSubscription!: Subscription;
  id1!: string;
  id2!: string;
  id3!: number;
  nombreMunicipio!: string;
  nombrePrestador!: string;
  buttonGallery: boolean = false;
  turnModal: boolean = false;
  prestadoresrandom:any
  pag:string = "Servicios";
      //? -> Unique ID para cada Usuario
      uid!: string;

      //? -> Objeto de tipo User guardado en la BD
      userDetails: any;

      //? -> Atractivos por actualizar en MeGusta
      atractivosItems: any = [];

      //? -> Prestadores por actualizar en MeGusta
      prestadoresItems: any = [];
    // ? -> Lo vamos a utilizar en el ngIf del span del aviso una vez enviado el Form
  currentPage: number = 1; // Página actual
  itemsPerPage!: number; // Cantidad de elementos por página
  buttonPags: string[] = ["Servicios","Horarios"];
  wasa?: string
  @ViewChild("carouselPresta") carouselPresta!: ElementRef;
  @ViewChild('leftButtonPresta') leftButtonPresta!: ElementRef;
  @ViewChild('rightButtonPresta') rightButtonPresta!: ElementRef;
  isDragging = false; startX!: number; startScrollLeftMuni: any; velocityX:any; startScrollLeftServi: any;  startScrollLeftPresta: any;  startScrollLeftAtrac: any; // Variables para el scroll horizontal
  scrollEndThreshold = 150; // Ajusta según sea necesario
  prestador: any; // Objeto que traemos desde el detalle de Municipio
  subscription!: Subscription; //Para manejar la suscripción de los datos

  map!: Map;

/**esto no hace nada 👍 */
  noHaceNada(vacio:null){
    return vacio;
  }


  servi:any = [];


/**
 * Array of strings containing URLs for images in the image gallery.
 */
  imgGallery: string[] = [

  ];

  imgPortada:string = "";
//todo OJITO TIENE QUE SER IGUALITO EL CONTENIDO DEL ARREGLO AL COMPONENTE DE PRESTADOR O SI NO SE DAÑA

  constructor(private route: ActivatedRoute,
    private title: Title,
    private router: Router,
    private modalService: ModalServiceService, //Inyectamos el servicio del modal
    private detalleService: DetalleService,
    private authService: AuthService,
    private homeService: HomeService,
  ) {
    this.title.setTitle('Pal\'Huila - Prestadores!' );
    this.route.params.subscribe(params => {
      // params contendrá los valores de los parámetros de ruta
      this.id1 = this.capitalizeFirstLetter(params['municipio'])
      this.id2 = params['prestador'];
      this.id3 = params['option'];

      this.cargarPrestador(this.id2);

    });

    this.nombreMunicipio = this.id1
    this.nombrePrestador = this.id2


  }

  imageLoaded: boolean[] = [];

  checkImageLoaded(index: number): void {
    this.imageLoaded[index] = true;
  }

  cargarPrestador(nombre: string) {
    this.imgGallery = [];
    this.subscription = this.detalleService.obtenerPrestador(nombre).subscribe(data => {
      const serviCountSlice: any =[]
      this.prestador = data[0];

    if(this.prestador.municipio !== undefined && this.prestador.municipio !== null && this.prestador.municipio !== "--" && this.prestador.municipio !== ""){
      this.detalleService.obtenerPrestadoresAleatorios(9,this.capitalizeFirstLetter(this.prestador.municipio)).then((data:any) => {
        this.prestadoresrandom = data
      })
    }
      if(this.prestador.whatsapp !== null){
        this.wasa = "https://api.whatsapp.com/send?phone=" + this.prestador.whatsapp + "&text=Hola quiero más información sobre "+ this.prestador.name +"!"
      }

      if(this.prestador.pathImages){
        this.prestador.pathImages.forEach((element: any) => {
          this.imgGallery.push(element.url)
         });
      }
      if(this.prestador.pathImagePortada.url){
        this.imgPortada = this.prestador.pathImagePortada.url;

        if(this.imgGallery[0] !== this.prestador.pathImagePortada.url){
          this.imgGallery.unshift(this.imgPortada)

        }
      }

      if(this.imgGallery.length > 3){
        this.buttonGallery = true;
      }




      //*Se carga el Mapa
      this.validarCargaDeMapa();

      /**
 * An array of objects representing different types of services offered by a provider.
 * Each object has a `title` and an `id` property.
 */

  const servi: any = [
  {
    "title": "Alojamiento Urbano",
    "id": this.prestador.alojamientoUrbano,
    "bd": "alojamientoUrbano"
  },
  {
    "title": "Alojamiento Rural",
    "id": this.prestador.alojamientoRural,
    "bd": "alojamientoRural"
  },
  {
    "title": "Restaurantes",
    "id": this.prestador.restaurantes,
    "bd": "restaurantes"
  },
  {
    "title": "Tiendas de Café",
    "id": this.prestador.tiendasDeCafe,
    "bd": "tiendasDeCafe"
  },
  {
    "title": "Antojos típicos",
    "id": this.prestador.antojosTipicos,
    "bd": "antojosTipicos"
  },
  {
    "title": "Sitio Natural",
    "id": this.prestador.sitioNatural,
    "bd": "sitioNatural"
  },
  {
    "title": "Patrimonio Cultural",
    "id": this.prestador.patrimonioCultural,
    "bd": "patrimonioCultural"
  },
  {
    "title": "Miradores",
    "id": this.prestador.miradores,
    "bd": "miradores"
  },
  {
    "title": "Parques Naturales",
    "id": this.prestador.parquesNaturales
    ,"bd": "parquesNaturales"
  },
  {
    "title": "Agencias de Viaje",
    "id": this.prestador.agenciasDeViaje,
    "bd": "agenciasDeViaje"
  },
  {
    "title": "Centro recreativo",
    "id": this.prestador.centroRecreativo,
    "bd": "centroRecreativo"
  },
  {
    "title": "Guías de Turismo",
    "id": this.prestador.guiasDeTurismo,
    "bd": "guiasDeTurismo"
  },
  {
    "title": "Aventura",
    "id": this.prestador.aventura,
    "bd": "aventura"
  },
  {
    "title": "Agro y eco turismo",
    "id": this.prestador.agroYEcoturismo,
    "bd": "agroYEcoturismo"
  },
  {
    "title": "Planes o Rutas",
    "id": this.prestador.planesORutas,
    "bd": "planesORutas"
  },
  {
    "title": "Artesanías",
    "id": this.prestador.artesanias,
    "bd": "artesanias"
  },
  {
    "title": "Transporte",
    "id": this.prestador.transporte,
    "bd": "transporte"
  },
  {
    "title": "Eventos",
    "id": this.prestador.eventos,
    "bd": "eventos"

  }
];


servi.forEach((servicio: { bd: string | number; }) => {
  if (this.prestador[servicio.bd] !== "--" && this.prestador[servicio.bd] !== null && this.prestador[servicio.bd] !== undefined) {
    serviCountSlice.push(servicio);
  }
});

  this.servi = serviCountSlice;

  this.itemsPerPage = 3;

  this.prestador = data[0]
    });

  }

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

  navigate(item: any) {
    //Validamos hacia qué componente deseamos direccionar
    if ('servicios' in item) { //*Validación para Prestadores
      this.router.navigate(['prestadores', this.capitalizeFirstLetter(item.municipio), this.capitalizeFirstLetter(item.name)]);
    } else if ('bienOLugar' in item) { //*Validación para Atractivos
      this.router.navigate(['atractivos', this.capitalizeFirstLetter(item.municipio), this.capitalizeFirstLetter(item.name)]);
    }
  }

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    this.checkScrollEnd(this.carouselPresta, this.leftButtonPresta, this.rightButtonPresta);


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


/**
 * Sends the selected option to the slider component and navigates to the slider route.
 * @param option - The selected option to be sent to the slider component.
 */
  send(option: number) {
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
    const servicios = document.getElementById("Servicios");
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    window.scrollTo({
      top: servicios!.offsetTop,
      behavior: "smooth" // Para un desplazamiento suave (con animación), o "auto" para un desplazamiento instantáneo.
    });
  }

  nextPage() {
    const servicios = document.getElementById("Servicios");
    if (this.currentPage * this.itemsPerPage < this.servi.length) {
      this.currentPage++;
    }
    window.scrollTo({
      top: servicios!.offsetTop,
      behavior: "smooth" // Para un desplazamiento suave (con animación), o "auto" para un desplazamiento instantáneo.
    });
  }

  ngOnInit(){
    this.modalDataSubscription = this.modalService.modalTurnSliderP$.subscribe((value) => {
      this.turnModal = value;
    });

  }
  //* CODIGO PARA OBTENER LATITUD Y LONGITUD APARTIR DE LINK DE GOOGLE MAPS
  async obtenerLatitudYLongitud() {
    // Comprueba si el enlace es probablemente un enlace acortado
    if (this.prestador.googleMaps.length < 200) { // Ajusta este valor según tu caso
      console.log('El enlace parece estar acortado. Intentando desacortarlo...');

      try {
        // Realiza una solicitud HTTP para desacortar el enlace usando un servicio como "unshorten.me"
        const response = await axios.get(`https://unshorten.me/s/${this.prestador.googleMaps}`).then((response) => {


        if (response.status === 200) { // Comprueba si la solicitud HTTP fue exitosa
          const longLink = response.data; // Obtiene el enlace desacortado
          console.log('Enlace desacortado:', longLink) // Muestra el enlace desacortado en la consola

          const coordenadasMatchConArroba = longLink.match(/@([-+]?\d+\.\d+),([-+]?\d+\.\d+)/);
          const coordenadasMatchSinArroba = longLink.match(/([-+]?\d+\.\d+),\s*([-+]?\d+\.\d+)/);

          if (coordenadasMatchConArroba && coordenadasMatchConArroba.length >= 3) {
            const latitud = coordenadasMatchConArroba[1];
            const longitud = coordenadasMatchConArroba[2];
            this.prestador.latitud = latitud;
            this.prestador.longitud = longitud;
            this.cargarMapa()

            console.log(`Latitud: ${latitud}, Longitud: ${longitud}`);
          } else if (coordenadasMatchSinArroba && coordenadasMatchSinArroba.length >= 3) {
            const latitud = coordenadasMatchSinArroba[1];
            const longitud = coordenadasMatchSinArroba[2];
            this.prestador.latitud = latitud;
            this.prestador.longitud = longitud;
            this.cargarMapa()
            console.log(`Latitud: ${latitud}, Longitud: ${longitud}`);
          } else {
            console.error('No se encontraron coordenadas en el enlace de Google Maps.');
          }

        } else {
          console.error('Error al desacortar el enlace.');
        }

        });


      } catch (error) {
        console.error('Error al realizar la solicitud HTTP:', error);
      }
    } else {

      console.log('El enlace parece estar en su formato original. No es necesario desacortarlo.');
      // Aquí puedes manejar la lógica para obtener las coordenadas si el enlace no está acortado.
    }
  }
  //? -> Método Dónde vamos a validar que latitud y longitud no dañen la página
  validarCargaDeMapa() {
    //* Hacemos validación de punto decimal para ambos números
    //* En este caso nos devuelte true en caso de que ambos contengan decimales
    const num1 = this.hasDecimalPoint(this.prestador.latitud);
    const num2 = this.hasDecimalPoint(this.prestador.longitud);

    if(num1 === null || num2 === null) {
      this.obtenerLatitudYLongitud();
     }
    //* Validación: 1.Tiene que ser tipo number y no debe ser tipo NaN
    if (((typeof this.prestador.latitud === "number") && (!(Number.isNaN(this.prestador.latitud)))) && ((typeof this.prestador.longitud === "number") && (!(Number.isNaN(this.prestador.longitud))))) {
    //* En caso de que ambas coordenadas no presenten problema con los puntos decimal ejecutamos el método del Mapa
    if(num1 && num2) {
      if(num1 === null || num2 === null) {
        console.log("null")
        return
      }else{

      //* Aquí se ejecuta el Mapa
      //*Mapa - Ejecutamos la lógica del mapa ya teniendo los datos que queremos mostrar
      this.cargarMapa();
      }

    }
    } else {
      this.obtenerLatitudYLongitud();
      console.log("La latitud o longitud NO es de tipo number o es NaN o no tiene punto decimal");
    }
  } //? -> Fin del método validarCargaDeMapa

  //? -> Método para saber si tienen punto decimal
  hasDecimalPoint(value: any): boolean {
    //console.log(value);
    return value.toString().includes('.');
  } //?- Fin Método

  //?- Método para cargar el Mapa
  cargarMapa() {
    if (!this.map) { // Verificar si el mapa ya está inicializado
      this.map = new Map('map').setView([this.prestador.latitud, this.prestador.longitud], 13);

      // Agregar capa de tiles
      tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',  {
      }).addTo(this.map);

      // Agregar un marcador
      marker([this.prestador.latitud, this.prestador.longitud]).addTo(this.map)
        .bindPopup(this.prestador.name)
        .openPopup();
    } else { // Si el mapa ya está inicializado, simplemente cambia el centro y el marcador
      this.map.setView([this.prestador.latitud, this.prestador.longitud], 13);
      marker([this.prestador.latitud, this.prestador.longitud]).addTo(this.map)
        .bindPopup(this.prestador.name)
        .openPopup();
    }
  }//? -> Fin Método Cargar Mapa

  //? -> Pasamos al html el celular 1 - Sirve sólo en celulares
  get telefonoHref1() {
    return `tel:${this.prestador.celular1}`;
  }

  //? -> Pasamos al html el celular 2 - Sirve sólo en celulares
  get telefonoHref2() {
    return `tel:${this.prestador.celular2}`;
  }


    //? -> Método me gusta
    meGusta(item: any) {
      console.log(item)
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
            //*Si el usuario ya tiene la propiedad no la agrega, de lo contrario lo hace y en ambos caso añade el sitio que le gusta
            if (!('prestadoresMeGusta' in this.userDetails)) {
              this.userDetails.prestadoresMeGusta = [item.id]; // Inicializa la propiedad si no existe
              //?Modificar el item.meGusta sumando 1
              if(item.meGusta >= 0) {
                item.meGusta = item.meGusta + 1;
                console.log(`Se agregó un like: ${item.meGusta}`);
                //? Hacer que se agrege el item en un arreglo de items para actualizar
                this.prestadoresItems.push(item);
              }
            } else {
              //? Se hace la validación de que si ya está guardado el id entonces no lo guarde, en ese caso lo quite.
              // this.userDetails.atractivosMeGusta = [];
              if (this.userDetails.prestadoresMeGusta.includes(item.id)) {
                //*El ID ya existe en el arreglo.
                // Encuentra la posición del ID en el arreglo
                let indice = this.userDetails.prestadoresMeGusta.indexOf(item.id);
                // Elimina el elemento de esa posición
                this.userDetails.prestadoresMeGusta.splice(indice, 1);
                console.log("ID eliminado del arreglo.");
                //? Modificar el item.meGusta restando 1
                // console.log(item.meGusta);
                if(item.meGusta >= 1) {
                  item.meGusta = item.meGusta - 1;
                  console.log(`Se eliminó un like: ${item.meGusta}`);
                  //? Hacer que se agrege el item en un arreglo de items para actualizar
                  this.prestadoresItems.push(item);
                }
              } else {
                //*El ID no se encuentra en el arreglo.
                this.userDetails.prestadoresMeGusta.push(item.id); //Se Agrega el id que me gustó
                console.log("ID agregado al arreglo.");
                //? Modificar el item.meGusta sumando 1
                // console.log(item.meGusta);
                if(item.meGusta >= 0) {
                  item.meGusta = item.meGusta + 1;
                  console.log(`Se agregó un like: ${item.meGusta}`);
                  //? Hacer que se agrege el item en un arreglo de items para actualizar
                  this.prestadoresItems.push(item);
                }
              }
            }

            console.log(this.userDetails);

            //*Aquí se actualiza la información del objeto en la BD
            this.authService.actualizarUsuario(this.uid, this.userDetails).then(() => {
              console.log('Se actualizó con éxito a la Base de Datos');
              this.authService.updateUserDetailsInLocalStorage();
            }).catch(() => {
              console.log('Ha ocurrido un error en la inserción a Base de Datos');
            }) //*Como último paso actualizamos el objeto


          } else if ('bienOLugar' in item) { //?Validación para Atractivos
            //*Si el usuario ya tiene la propiedad no la agrega, de lo contrario lo hace y en ambos caso añade el sitio que le gusta
            if (!('atractivosMeGusta' in this.userDetails)) {
              this.userDetails.atractivosMeGusta = [item.id]; // Inicializa la propiedad si no existe
              //?Modificar el item.meGusta sumando 1
              if(item.meGusta >= 0) {
                item.meGusta = item.meGusta + 1;
                console.log(`Se agregó un like: ${item.meGusta}`);
                //? Hacer que se agrege el item en un arreglo de items para actualizar
                this.atractivosItems.push(item);
              }
            } else {
              //? Se hace la validación de que si ya está guardado el id entonces no lo guarde, en ese caso lo quite.
              // this.userDetails.atractivosMeGusta = [];
              if (this.userDetails.atractivosMeGusta.includes(item.id)) {
                //*El ID ya existe en el arreglo.
                // Encuentra la posición del ID en el arreglo
                let indice = this.userDetails.atractivosMeGusta.indexOf(item.id);
                // Elimina el elemento de esa posición
                this.userDetails.atractivosMeGusta.splice(indice, 1);
                console.log("ID eliminado del arreglo.");
                //? Modificar el item.meGusta restando 1
                // console.log(item.meGusta);
                if(item.meGusta >= 1) {
                  item.meGusta = item.meGusta - 1;
                  console.log(`Se eliminó un like: ${item.meGusta}`);
                  //? Hacer que se agrege el item en un arreglo de items para actualizar
                  this.atractivosItems.push(item);
                }
              } else {
                //*El ID no se encuentra en el arreglo.
                this.userDetails.atractivosMeGusta.push(item.id); //Se Agrega el id que me gustó
                console.log("ID agregado al arreglo.");
                //? Modificar el item.meGusta sumando 1
                // console.log(item.meGusta);
                if(item.meGusta >= 0) {
                  item.meGusta = item.meGusta + 1;
                  console.log(`Se agregó un like: ${item.meGusta}`);
                  //? Hacer que se agrege el item en un arreglo de items para actualizar
                  this.atractivosItems.push(item);
                }
              }
            }

            console.log(this.userDetails);

            //*Aquí se actualiza la información del objeto en la BD
            this.authService.actualizarUsuario(this.uid, this.userDetails).then(() => {
              console.log('Se actualizó con éxito a la Base de Datos');
              this.authService.updateUserDetailsInLocalStorage();

            }).catch(() => {
              console.log('Ha ocurrido un error en la inserción a Base de Datos');
            }) //*Como último paso actualizamos el objeto

          }

        }
      });

    } //? -> MeGusta Final


    //? -> Método me gusta
    save(item: any) {
      console.log(item)
      //*Item hace referencia al Prestador o Atractivo
      //console.log('Me gusta: ', item);

      //* Traigo el usuario actual que quiero actualizar con los Save
      this.authService.onAuthStateChanged((user, userDetails) => {
        if (user && userDetails) {
          this.uid = user.uid; //* uid -> Desde Firebase
          this.userDetails = userDetails; //* userDetails -> Objeto traido desde la BD de la colección users

          //?Aquí tengo que Actualizar el documento en la colección users
          //*Debemos definir en qué arreglo de Save queremos guardar el resultado
          if ('servicios' in item) { //?Validación para Prestadores
            //*Si el usuario ya tiene la propiedad no la agrega, de lo contrario lo hace y en ambos caso añade el sitio que le gusta
            if (!('prestadoresSave' in this.userDetails)) {
              this.userDetails.prestadoresSave = [item.id]; // Inicializa la propiedad si no existe
              //?Modificar el item.meGusta sumando 1

            } else {
              //? Se hace la validación de que si ya está guardado el id entonces no lo guarde, en ese caso lo quite.
              // this.userDetails.atractivosSave = [];
              if (this.userDetails.prestadoresSave.includes(item.id)) {
                //*El ID ya existe en el arreglo.
                // Encuentra la posición del ID en el arreglo
                let indice = this.userDetails.prestadoresSave.indexOf(item.id);
                // Elimina el elemento de esa posición
                this.userDetails.prestadoresSave.splice(indice, 1);
                console.log("ID eliminado del arreglo.");
                //? Modificar el item.Save restando 1
                // console.log(item.Save);

              } else {
                //*El ID no se encuentra en el arreglo.
                this.userDetails.prestadoresSave.push(item.id); //Se Agrega el id que me gustó
                console.log("ID agregado al arreglo.");
                //? Modificar el item.Save sumando 1

              }
            }

            console.log(this.userDetails);

            //*Aquí se actualiza la información del objeto en la BD
            this.authService.actualizarUsuario(this.uid, this.userDetails).then(() => {
              console.log('Se actualizó con éxito a la Base de Datos');
              this.authService.updateUserDetailsInLocalStorage();
            }).catch(() => {
              console.log('Ha ocurrido un error en la inserción a Base de Datos');
            }) //*Como último paso actualizamos el objeto


          } else if ('bienOLugar' in item) { //?Validación para Atractivos
            //*Si el usuario ya tiene la propiedad no la agrega, de lo contrario lo hace y en ambos caso añade el sitio que le gusta
            if (!('atractivosSave' in this.userDetails)) {
              this.userDetails.atractivosSave = [item.id]; // Inicializa la propiedad si no existe
              //?Modificar el item.Save sumando 1

            } else {
              //? Se hace la validación de que si ya está guardado el id entonces no lo guarde, en ese caso lo quite.
              // this.userDetails.atractivosSave = [];
              if (this.userDetails.atractivosSave.includes(item.id)) {
                //*El ID ya existe en el arreglo.
                // Encuentra la posición del ID en el arreglo
                let indice = this.userDetails.atractivosSave.indexOf(item.id);
                // Elimina el elemento de esa posición
                this.userDetails.atractivosSave.splice(indice, 1);
                console.log("ID eliminado del arreglo.");
                //? Modificar el item.Save restando 1

              } else {
                //*El ID no se encuentra en el arreglo.
                this.userDetails.atractivosSave.push(item.id); //Se Agrega el id que me gustó
                console.log("ID agregado al arreglo.");
                //? Modificar el item.Save sumando 1
                // console.log(item.Save);

              }
            }

            console.log(this.userDetails);

            //*Aquí se actualiza la información del objeto en la BD
            this.authService.actualizarUsuario(this.uid, this.userDetails).then(() => {
              console.log('Se actualizó con éxito a la Base de Datos');
              this.authService.updateUserDetailsInLocalStorage(); //Agrega a localStorage los cambios
            }).catch(() => {
              console.log('Ha ocurrido un error en la inserción a Base de Datos');
            }) //*Como último paso actualizamos el objeto

          }

        }
      });

    } //? -> MeGusta Final

    actualizarAtractivos(items: any[]): Promise<void[]> {
      const promesas = items.map(item => this.homeService.atractivoMeGusta(item));
      return Promise.all(promesas);
    }

    actualizarPrestadores(items: any[]): Promise<void[]> {
      const promesas = items.map(item => this.homeService.prestadorMeGusta(item));
      return Promise.all(promesas);
    }

  ngOnDestroy(){
    this.modalDataSubscription.unsubscribe();
    this.subscription.unsubscribe();

    if(this.atractivosItems.length > 0) {
      //? Disparar el método actualizarAtractivos aquí antes de destruir el componente
      this.actualizarAtractivos(this.atractivosItems)
      .then(() => {
        console.log("Todos los atractivos han sido actualizados");
      })
      .catch(error => {
        console.error("Error al actualizar atractivos: ", error);
      });
    }


    if(this.prestadoresItems.length > 0) {
      //? Disparar el método actualizarAtractivos aquí antes de destruir el componente
      this.actualizarPrestadores(this.prestadoresItems)
      .then(() => {
        console.log("Todos los Prestadores han sido actualizados");
      })
      .catch(error => {
        console.error("Error al actualizar prestadores: ", error);
      });
    }

  }

}
