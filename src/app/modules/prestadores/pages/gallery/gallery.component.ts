import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  count: number = 0;

  imgGallery: string[] = [

  ];//todo OJITO TIENE QUE SER IGUALITO EL CONTENIDO DEL ARREGLO AL COMPONENTE DE PRESTADOR O SI NO SE DAÑA

  constructor(private route: ActivatedRoute,  private router: Router, private modalService:ModalServiceService) {

    this.id1= this.url[2];
    this.id2= decodeURI(this.url[3]);
    this.route.params.subscribe(params => {
      // params contendrá los valores de los parámetros de ruta
      this.id3 = params['option'];

    });
    this.count = Number(this.id3);
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
