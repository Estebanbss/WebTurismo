import { Component, } from '@angular/core';



@Component({
  selector: 'app-button-carousel',
  templateUrl: './button-carousel.component.html',
  styleUrls: ['./button-carousel.component.css']
})

export class ButtonCarouselComponent {


  botonActivo: string = '';

  activarBoton(boton: string) {
    this.botonActivo = boton;
  }
  


  titles = [
    //************************************* */
    {
      headingText: '¿Dónde dormir?',
      routerlink: "/home"
    },

  //************************************* */

    {
      headingText: '¿Dónde comer?',
      routerlink: "/home"
    },

  //************************************* */

    {
      headingText: '¿A Dónde ir?',
      routerlink: "/home"
    },

  //************************************* */

    {
      headingText: 'Cosas que hacer',
      routerlink: "/home"
    },

  //************************************* */


  ]


}


