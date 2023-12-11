import { Component } from '@angular/core';
import { ActivatedRoute, Router,  } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ModalServiceService } from 'src/app/core/services/modal-service.service';
import { MostrarMunicipioService } from 'src/app/core/services/mostrar-municipio.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {


  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute, private modalService: ModalServiceService, private mostrarMunicipioService: MostrarMunicipioService) {
    this.auth.onAuthStateChanged((user, userDetails) => {this.userauth = user}, );

    this.route.params.subscribe(params => {
      this.user = null;
      this.profileId = params['id'];
      if (this.profileId) {
        this.auth.obtenerUsuarioPorUserName(this.profileId).subscribe((user) => {
          this.user = user[0];

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

        });
      }
      this.modalService.setProfileHeader(false);


    });


}
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
  //       console.log("Nuevo ultimoDocumento: ", this.ultimoDocumento);
  //     } else {
  //       console.log("No hay más documentos para cargar");
  //     }
  //   });
  // }
  loading:boolean = true;

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit")
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.

  }
}
