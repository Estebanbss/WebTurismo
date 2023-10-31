import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ModalServiceService } from './core/services/modal-service.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

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

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Lleva la página al principio al cargar una nueva página
        window.scrollTo(0, 0);
      }
    });


  }

  title = `Pa'lHuila`;
  ngOnInit(){

  }



  onKeyDown(event: KeyboardEvent) {
    const targetElement = event.target as HTMLElement;

    // Verifica si el evento no se originó en un elemento con la clase "no-close"
    if (!targetElement.classList.contains('no-close') && targetElement.tagName !=="svg" && targetElement.tagName !=="li" && targetElement.tagName !=="path" && targetElement.tagName !=="span" && targetElement.tagName !=="ul"     && event.key === "Escape") {

      this.modal.setProfileHeader(false);
      this.modal.setTurnMuni(false);
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
