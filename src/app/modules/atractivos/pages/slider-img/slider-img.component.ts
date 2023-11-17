import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DetalleService } from 'src/app/core/services/detalle.service';


@Component({
  selector: 'app-slider-img',
  templateUrl: './slider-img.component.html',
  styleUrls: ['./slider-img.component.css'],
  host: {
    '(document:keydown)': 'onKeyDown($event)'
  }
})
export class SliderImgComponent {
  id1!: string;
  id2!: string;
  id3!: string;
  url: string[] = this.router.url.split('/');
  imgDefault: string = "https://firebasestorage.googleapis.com/v0/b/centurhuila-b9e47.appspot.com/o/Banner%2FDefaultImg.png?alt=media&token=d39c6440-fc6f-4313-ad59-92efc776f114"
  count!: number;
  atractivo: any; // Objeto que traemos desde el detalle de Municipio
  subscription!: Subscription; //Para manejar la suscripción de los datos
  imgGallery: string[] = [];//todo OJITO TIENE QUE SER IGUALITO EL CONTENIDO DEL ARREGLO AL COMPONENTE DE PRESTADOR O SI NO SE DAÑA
  modalDataSubscription: any;
  imgPortada: string = "";
  turnModal: boolean | undefined;


  constructor(private route: ActivatedRoute,  private router: Router, private detalleService:DetalleService) {
    this.cargarAtractivo(decodeURI(this.url[3]));






  }

  buttonModal() {
    this.router.navigate(['../../'], { relativeTo: this.route })
  }

  gallery(){
    this.router.navigateByUrl(`/atractivos/${this.id1}/${this.id2}/gallery`)
  }


  cargarAtractivo(nombre: string) {
    this.subscription = this.detalleService.obtenerAtractivo(nombre).subscribe((data:any) => {
      this.atractivo = data[0];
      if(this.atractivo.pathImages){
        this.atractivo.pathImages.forEach((element: any) => {
          this.imgGallery.push(element.url)
         });
      }
      if(this.atractivo.pathImagePortada){
        this.imgPortada = this.atractivo.pathImagePortada.url;

        if(this.imgGallery[0] !== this.atractivo.pathImagePortada.url){

          this.imgGallery.unshift(this.imgPortada)
        }
      }

      this.route.params.subscribe(params => {
        this.id1= this.url[2];
        this.count = Number(params['option']);

        console.log(this.imgGallery);
        if(this.count > this.imgGallery.length || isNaN(this.count)){
          this.count = 1;
        }else{
          this.count = Number(params['option']);
        }

        this.id2= decodeURI(this.url[3]);

      });

      this.router.navigateByUrl(`/atractivos/${this.id1}/${this.id2}/slider/${this.count}`)

    });

  }







  buttonSlider(direction: string) {

    if (direction === "next") {

      if (this.count === this.imgGallery.length) {

        this.count = 1;
      } else {

        this.count++;

      }
    } else {

      if (this.count === 1) {

        this.count = this.imgGallery.length;
      } else {
        this.count--;
      }
    }

    this.router.navigateByUrl(`/atractivos/${this.id1}/${this.id2}/slider/${this.count}`)

  }

  ngOnInit() {

  }

  onKeyDown(event: KeyboardEvent) {
    const targetElement = event.target as HTMLElement;

    // Verifica si el evento no se originó en un elemento con la clase "no-close"
    if (!targetElement.classList.contains('no-close') && targetElement.tagName !=="svg" && targetElement.tagName !=="li" && targetElement.tagName !=="path" && targetElement.tagName !=="span" && targetElement.tagName !=="ul"     && event.key === "Escape") {

      this.buttonModal();
    }
  }




  ngOndestroy(){
  }



  capitalizeFirstLetter(inputString: string): string {
    if (inputString.length === 0) {
      return inputString;
    }
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }

}
