import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ModalServiceService } from './core/services/modal-service.service';
import { NavigationEnd, Router } from '@angular/router';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(document:keydown)': 'onKeyDown($event)'
  }
})
export class AppComponent implements OnInit {



  constructor(private modal: ModalServiceService, private router: Router){



  }

  mostrarBoton: boolean = false;

  title = `Pa'lHuila`;

  ngOnInit(){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollPosition = window.scrollY;
    // Determina la posición en la que deseas mostrar el botón
    const mostrarEnPosicion = 500; // Ejemplo: muestra el botón cuando el usuario ha desplazado 500 píxeles hacia abajo.

    this.mostrarBoton = scrollPosition > mostrarEnPosicion;
  }

  toTop(){
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth" // Agregar "smooth" para un desplazamiento suave
    });
  }

  onKeyDown(event: KeyboardEvent) {
    const targetElement = event.target as HTMLElement;

    // Verifica si el evento no se originó en un elemento con la clase "no-close"
    if (!targetElement.classList.contains('no-close') && targetElement.tagName !=="svg" && targetElement.tagName !=="li" && targetElement.tagName !=="path" && targetElement.tagName !=="span" && targetElement.tagName !=="ul"     && event.key === "Escape") {

      this.modal.setProfileHeader(false);
      this.modal.setTurnMuni(false);
      this.modal.setTurnSliderP(true);
    }
  }


  handleKeydown(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    // Verifica si el evento no se originó en un elemento con la clase "no-close"
    if (!targetElement.classList.contains('no-close') && targetElement.tagName !=="svg"  && targetElement.tagName !=="li"  && targetElement.tagName !=="path" && targetElement.tagName !=="span"  && targetElement.tagName !=="ul" && targetElement.tagName !=="button"    ) {

      this.modal.setProfileHeader(false);
      this.modal.setTurnMuni(false);
    }
    }

}
