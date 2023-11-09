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
  prestador: any; // Objeto que traemos desde el detalle de Municipio
  subscription!: Subscription; //Para manejar la suscripción de los datos
  imgGallery: string[] = [


  ];//todo OJITO TIENE QUE SER IGUALITO EL CONTENIDO DEL ARREGLO AL COMPONENTE DE PRESTADOR O SI NO SE DAÑA
  modalDataSubscription: any;
  turnModal: boolean | undefined;


  constructor(private route: ActivatedRoute,  private router: Router, private detalleService:DetalleService) {

    this.route.params.subscribe(params => {

      this.id1= this.url[2];
      this.id3 = params['option'];
      this.id2= decodeURI(this.url[3]);

    });

    this.cargarPrestador(decodeURI(this.url[3]));
    console.log(this.imgGallery)
    console.log(this.count)

    this.router.navigateByUrl(`/prestadores/${this.id1}/${this.id2}/slider/${this.count}`)


  }

  buttonModal() {

    this.router.navigate(['../../'], { relativeTo: this.route })
  }

  gallery(){

    this.router.navigateByUrl(`/prestadores/${this.id1}/${this.id2}/gallery`)
  }


  cargarPrestador(nombre: string) {
    this.subscription = this.detalleService.obtenerPrestador(nombre).subscribe((data:any) => {

      this.prestador = data[0];

      if(this.prestador.pathImages){
        this.prestador.pathImages.forEach((element: any) => {
          this.imgGallery.push(element.url)

         });
         this.count = !this.id3 || isNaN(Number(this.id3)) || Number(this.id3) > this.imgGallery.length ? 1 : Number(this.id3);
      }



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

    this.router.navigateByUrl(`/prestadores/${this.id1}/${this.id2}/slider/${this.count}`)


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
