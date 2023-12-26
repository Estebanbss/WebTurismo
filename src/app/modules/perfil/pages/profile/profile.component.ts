import { Component } from '@angular/core';
import { ActivatedRoute, Router,  } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { HomeService } from 'src/app/core/services/home.service';
import { ModalServiceService } from 'src/app/core/services/modal-service.service';
import { MostrarMunicipioService } from 'src/app/core/services/mostrar-municipio.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {


  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute, private modalService: ModalServiceService, private mostrarMunicipioService: MostrarMunicipioService, private homeService: HomeService) {
    this.auth.onAuthStateChanged((user, userDetails) => {this.userauth = user}, );

    this.route.params.subscribe(params => {
      this.user = null;
      this.profileId = params['id'];
      if (this.profileId) {
        this.auth.obtenerUsuarioPorUserName(this.profileId).subscribe((user) => {
          this.user = user[0];
          this.dataLoaded = true;
          this.loadCards();

        });
      }
      this.modalService.setProfileHeader(false);


    });


}


      //? -> Unique ID para cada Usuario
      uid!: string;

      //? -> Objeto de tipo User guardado en la BD
      userDetails: any;

      //? -> Atractivos por actualizar en MeGusta
      atractivosItems: any = [];

      //? -> Prestadores por actualizar en MeGusta
      prestadoresItems: any = [];

    dataLoaded:boolean = false;
    profileId!: string;
    litadoPrestadoresyAtractivosL: any;
    litadoPrestadoresyAtractivosS: any;
    user:any;
    userauth:any;
    pag:string = "Sitios";
    currentPage: number = 1; // Página actual
    page: number = 1;
    buttonPags: string[] = ["Sitios","Likes"];
    atractivosIDL: string[] = [];
    prestadoresIDL: string[] = [];
    atractivosIDS: string[] = [];
    prestadoresIDS: string[] = [];
    firstL:boolean = true;
  ngOnInit(): void {


    this.auth.setData(this.router.url);


    // this.mostrarMunicipioService.obtenerAtractivosPorArreglodeID(this.atractivosIDL).subscribe((atractivos) => {
    //   this.mostrarMunicipioService.obtenerPrestadoresPorArreglodeID(this.prestadoresIDL).subscribe((prestadores) => {
    //     this.litadoPrestadoresyAtractivosL = [...atractivos, ...prestadores];
    //   });
    // });

    // this.mostrarMunicipioService.obtenerAtractivosPorArreglodeID(this.atractivosIDS).subscribe((atractivos) => {
    //   this.mostrarMunicipioService.obtenerPrestadoresPorArreglodeID(this.prestadoresIDS).subscribe((prestadores) => {
    //     this.litadoPrestadoresyAtractivosS = [...atractivos, ...prestadores];
    //   });
    // });


  }

  loadCards(){
    this.litadoPrestadoresyAtractivosL = [];
    this.litadoPrestadoresyAtractivosS = [];
    if(this.loading && this.user){
      this.atractivosIDL = this.user.atractivosMeGusta;
      this.atractivosIDS = this.user.atractivosSave;
      this.prestadoresIDL = this.user.prestadoresMeGusta;
      this.prestadoresIDS = this.user.prestadoresSave;


      if (this.atractivosIDL.length > 0 || this.prestadoresIDL.length > 0) {
        if (this.atractivosIDL.length > 0) {
          this.mostrarMunicipioService.obtenerAtractivosPorArreglodeID(this.atractivosIDL).subscribe((atractivos) => {
            this.litadoPrestadoresyAtractivosL = atractivos;
            if (this.prestadoresIDL.length > 0) {
              this.mostrarMunicipioService.obtenerPrestadoresPorArreglodeID(this.prestadoresIDL).subscribe((prestadores) => {
                this.litadoPrestadoresyAtractivosL = [...this.litadoPrestadoresyAtractivosL, ...prestadores];
              });
            }
          });
        } else if (this.prestadoresIDL.length > 0) {
          this.mostrarMunicipioService.obtenerPrestadoresPorArreglodeID(this.prestadoresIDL).subscribe((prestadores) => {
            this.litadoPrestadoresyAtractivosL = prestadores;
          });
        }
      }

      if (this.atractivosIDS.length > 0 || this.prestadoresIDS.length > 0) {
        if (this.atractivosIDS.length > 0) {
          this.mostrarMunicipioService.obtenerAtractivosPorArreglodeID(this.atractivosIDS).subscribe((atractivos) => {
            this.litadoPrestadoresyAtractivosS = atractivos;
            if (this.prestadoresIDS.length > 0) {
              this.mostrarMunicipioService.obtenerPrestadoresPorArreglodeID(this.prestadoresIDS).subscribe((prestadores) => {
                this.litadoPrestadoresyAtractivosS = [...this.litadoPrestadoresyAtractivosS, ...prestadores];
              });
            }
          });
        } else if (this.prestadoresIDS.length > 0) {
          this.mostrarMunicipioService.obtenerPrestadoresPorArreglodeID(this.prestadoresIDS).subscribe((prestadores) => {
            this.litadoPrestadoresyAtractivosS = prestadores;
          });
        }
      }

  }
  }
  buttonPag(option:string){
    this.page = 1;
    this.pag = option;
  }



  modaledit(): void{

    this.router.navigate(['edit'], { relativeTo: this.route })

  }
  trackByFn(index: number, item: any): number {
    return item.id; // Utiliza un identificador único para tus elementos
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
  capitalizeFirstLetter(inputString: string): string {
    if (inputString.length === 0) {
      return inputString;
    }
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }

  // cargarMasDocumentos() {
  //   this.prestadores2Subscription = this.mostrarMunicipioService.obtenerPrestadoresPaginacion(true, this.ultimoDocumento).subscribe(documentos => {
  //     if (documentos.length > 0) {
  //       this.ultimoDocumento = documentos[documentos.length - 1];
  //       documentos = this.shuffleArray(documentos);
  //       this.litadoPrestadores = [...this.litadoPrestadores, ...documentos];
  //       ("Nuevo ultimoDocumento: ", this.ultimoDocumento);
  //     } else {
  //       ("No hay más documentos para cargar");
  //     }
  //   });
  // }
  loading:boolean = true;


    //? -> Método me gusta
    meGusta(item: any) {
      (item)
      //*Item hace referencia al Prestador o Atractivo
      //('Me gusta: ', item);

      //* Traigo el usuario actual que quiero actualizar con los meGusta
      this.auth.onAuthStateChanged((user, userDetails) => {
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
                (`Se agregó un like: ${item.meGusta}`);
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
                ("ID eliminado del arreglo.");
                //? Modificar el item.meGusta restando 1
                // (item.meGusta);
                if(item.meGusta >= 1) {
                  item.meGusta = item.meGusta - 1;
                  (`Se eliminó un like: ${item.meGusta}`);
                  //? Hacer que se agrege el item en un arreglo de items para actualizar
                  this.prestadoresItems.push(item);
                }
              } else {
                //*El ID no se encuentra en el arreglo.
                this.userDetails.prestadoresMeGusta.push(item.id); //Se Agrega el id que me gustó
                ("ID agregado al arreglo.");
                //? Modificar el item.meGusta sumando 1
                // (item.meGusta);
                if(item.meGusta >= 0) {
                  item.meGusta = item.meGusta + 1;
                  (`Se agregó un like: ${item.meGusta}`);
                  //? Hacer que se agrege el item en un arreglo de items para actualizar
                  this.prestadoresItems.push(item);
                }
              }
            }

            (this.userDetails);

            //*Aquí se actualiza la información del objeto en la BD
            this.auth.actualizarUsuario(this.uid, this.userDetails).then(() => {
              ('Se actualizó con éxito a la Base de Datos');
              this.auth.updateUserDetailsInLocalStorage();
              this.loadCards();

            }).catch(() => {
              ('Ha ocurrido un error en la inserción a Base de Datos');
            }) //*Como último paso actualizamos el objeto


          } else if ('bienOLugar' in item) { //?Validación para Atractivos
            //*Si el usuario ya tiene la propiedad no la agrega, de lo contrario lo hace y en ambos caso añade el sitio que le gusta
            if (!('atractivosMeGusta' in this.userDetails)) {
              this.userDetails.atractivosMeGusta = [item.id]; // Inicializa la propiedad si no existe
              //?Modificar el item.meGusta sumando 1
              if(item.meGusta >= 0) {
                item.meGusta = item.meGusta + 1;
                (`Se agregó un like: ${item.meGusta}`);
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
                ("ID eliminado del arreglo.");
                //? Modificar el item.meGusta restando 1
                // (item.meGusta);
                if(item.meGusta >= 1) {
                  item.meGusta = item.meGusta - 1;
                  (`Se eliminó un like: ${item.meGusta}`);
                  //? Hacer que se agrege el item en un arreglo de items para actualizar
                  this.atractivosItems.push(item);
                }
              } else {
                //*El ID no se encuentra en el arreglo.
                this.userDetails.atractivosMeGusta.push(item.id); //Se Agrega el id que me gustó
                ("ID agregado al arreglo.");
                //? Modificar el item.meGusta sumando 1
                // (item.meGusta);
                if(item.meGusta >= 0) {
                  item.meGusta = item.meGusta + 1;
                  (`Se agregó un like: ${item.meGusta}`);
                  //? Hacer que se agrege el item en un arreglo de items para actualizar
                  this.atractivosItems.push(item);
                }
              }
            }

            (this.userDetails);

            //*Aquí se actualiza la información del objeto en la BD
            this.auth.actualizarUsuario(this.uid, this.userDetails).then(() => {
              ('Se actualizó con éxito a la Base de Datos');
              this.auth.updateUserDetailsInLocalStorage();
              this.loadCards();


            }).catch(() => {
              ('Ha ocurrido un error en la inserción a Base de Datos');
            }) //*Como último paso actualizamos el objeto

          }

        }
      });

    } //? -> MeGusta Final


    //? -> Método me gusta
    save(item: any) {
      (item)
      //*Item hace referencia al Prestador o Atractivo
      //('Me gusta: ', item);

      //* Traigo el usuario actual que quiero actualizar con los Save
      this.auth.onAuthStateChanged((user, userDetails) => {
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
                ("ID eliminado del arreglo.");
                //? Modificar el item.Save restando 1
                // (item.Save);

              } else {
                //*El ID no se encuentra en el arreglo.
                this.userDetails.prestadoresSave.push(item.id); //Se Agrega el id que me gustó
                ("ID agregado al arreglo.");
                //? Modificar el item.Save sumando 1

              }
            }

            (this.userDetails);

            //*Aquí se actualiza la información del objeto en la BD
            this.auth.actualizarUsuario(this.uid, this.userDetails).then(() => {
              ('Se actualizó con éxito a la Base de Datos');
              this.auth.updateUserDetailsInLocalStorage();
              this.loadCards();

            }).catch(() => {
              ('Ha ocurrido un error en la inserción a Base de Datos');
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
                ("ID eliminado del arreglo.");
                //? Modificar el item.Save restando 1

              } else {
                //*El ID no se encuentra en el arreglo.
                this.userDetails.atractivosSave.push(item.id); //Se Agrega el id que me gustó
                ("ID agregado al arreglo.");
                //? Modificar el item.Save sumando 1
                // (item.Save);

              }
            }

            (this.userDetails);

            //*Aquí se actualiza la información del objeto en la BD
            this.auth.actualizarUsuario(this.uid, this.userDetails).then(() => {
              ('Se actualizó con éxito a la Base de Datos');
              this.auth.updateUserDetailsInLocalStorage();
              this.loadCards();
              //Agrega a localStorage los cambios
            }).catch(() => {
              ('Ha ocurrido un error en la inserción a Base de Datos');
            }) //*Como último paso actualizamos el objeto

          }

        }
      });

      this.loadCards();

    } //? -> MeGusta Final

    actualizarAtractivos(items: any[]): Promise<void[]> {
      const promesas = items.map(item => this.homeService.atractivoMeGusta(item));
      return Promise.all(promesas);
    }

    actualizarPrestadores(items: any[]): Promise<void[]> {
      const promesas = items.map(item => this.homeService.prestadorMeGusta(item));
      return Promise.all(promesas);
    }


  ngOnDestroy(): void {
    clearInterval(this.interval)
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.atractivosItems.length > 0) {
      //? Disparar el método actualizarAtractivos aquí antes de destruir el componente
      this.actualizarAtractivos(this.atractivosItems)
      .then(() => {
        ("Todos los atractivos han sido actualizados");
      })
      .catch(error => {
        console.error("Error al actualizar atractivos: ", error);
      });
    }


    if(this.prestadoresItems.length > 0) {
      //? Disparar el método actualizarAtractivos aquí antes de destruir el componente
      this.actualizarPrestadores(this.prestadoresItems)
      .then(() => {
        ("Todos los Prestadores han sido actualizados");
      })
      .catch(error => {
        console.error("Error al actualizar prestadores: ", error);
      });
    }

  }
  interval: any;
  change: number = 0;

  ngAfterViewInit(): void {


    this.interval = setInterval(() => {
      this.auth.onAuthStateChanged((user, userDetails) => {
        this.userDetails = userDetails; //* userDetails -> Objeto traido desde la BD de la colección users
      });

      this.change = this.change + 1;

      if (this.change >= 20) {
        clearInterval(this.interval); // Detener el intervalo cuando change sea mayor o igual a 20
      }
    }, 100);
  }


  ngAfterViewChecked(): void {
    //traigo el usuario actual cada 5 segundos
    console.log(this.litadoPrestadoresyAtractivosL, this.litadoPrestadoresyAtractivosS)

  }
}
