import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DetalleService } from 'src/app/core/services/detalle.service';
import { ModalServiceService } from 'src/app/core/services/modal-service.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  host: {
    '(document:keydown)': 'onKeyDown($event)'
  }
})
export class GalleryComponent {
  id1!: string;
  id2!: string;
  id3!: number;
  url: string[] = this.router.url.split('/');
  imgDefault: string = "https://firebasestorage.googleapis.com/v0/b/centurhuila-b9e47.appspot.com/o/Banner%2FDefaultImg.png?alt=media&token=d39c6440-fc6f-4313-ad59-92efc776f114"
  count!: number;
  prestador: any; // Objeto que traemos desde el detalle de Municipio
  subscription!: Subscription; //Para manejar la suscripción de los datos
  imgGallery: string[] = [];//todo OJITO TIENE QUE SER IGUALITO EL CONTENIDO DEL ARREGLO AL COMPONENTE DE PRESTADOR O SI NO SE DAÑA
  modalDataSubscription: any;
  imgPortada: string = "";
  turnModal: boolean | undefined;

  constructor(private route: ActivatedRoute,  private router: Router, private modalService:ModalServiceService, private detalleService:DetalleService) {
    this.cargarPrestador(decodeURI(this.url[3]));
    this.id1= this.url[2];
    this.id2= decodeURI(this.url[3]);
    this.route.params.subscribe(params => {
      this.id3 = params['option'];
    });
    this.count = Number(this.id3);
  }
  cargarPrestador(nombre: string) {
    this.subscription = this.detalleService.obtenerPrestador(nombre).subscribe((data:any) => {
      this.prestador = data[0];
      if(this.prestador.pathImages){
        this.prestador.pathImages.forEach((element: any) => {
          this.imgGallery.push(element.url)
         });
      }
      if(this.prestador.pathImagePortada){
        this.imgPortada = this.prestador.pathImagePortada.url;

        if(this.imgGallery[0] !== this.prestador.pathImagePortada.url){

          this.imgGallery.unshift(this.imgPortada)
        }
      }
    });


    isNaN(this.count) ? this.count = 1 : this.count = this.count;

    this.count > this.imgGallery.length ? this.count = 1 : this.count = this.count;
  }



  buttonModal() {

    this.router.navigate(['../'], { relativeTo: this.route })
  }


  send(option: number) {


    this.id3 = option;
    // Construct the new route with "slider/:option" adde
    // Navigate to the new route
    this.router.navigateByUrl(`/prestadores/${this.id1}/${this.id2}/slider/${option+1}`)

  }


  ngOninit(){
   console.log(this.count)
   this.count = Number(this.id3);

  }

  onKeyDown(event: KeyboardEvent) {
    const targetElement = event.target as HTMLElement;

    // Verifica si el evento no se originó en un elemento con la clase "no-close"
    if (!targetElement.classList.contains('no-close') && targetElement.tagName !=="svg" && targetElement.tagName !=="li" && targetElement.tagName !=="path" && targetElement.tagName !=="span" && targetElement.tagName !=="ul"     && event.key === "Escape") {

      this.buttonModal();
    }
  }




  capitalizeFirstLetter(inputString: string): string {
    if (inputString.length === 0) {
      return inputString;
    }
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }

}
