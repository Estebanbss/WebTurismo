import { Component, } from '@angular/core';



@Component({
  selector: 'app-button-carousel',
  templateUrl: './button-carousel.component.html',
  styleUrls: ['./button-carousel.component.css']
})

export class ButtonCarouselComponent {


  titles = [
    //************************************* */
    {
      headingText: '¿Donde dormir?',
      routerlink: "/home"
    },

  //************************************* */

    {
      headingText: '¿Donde comer?',
      routerlink: "/home"
    },

  //************************************* */

    {
      headingText: '¿A Donde ir?',
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


