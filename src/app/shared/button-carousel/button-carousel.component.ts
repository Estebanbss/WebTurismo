import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-button-carousel',
  templateUrl: './button-carousel.component.html',
  styleUrls: ['./button-carousel.component.css']
})
export class ButtonCarouselComponent implements OnInit{

  showCarousel = false;

  ngOnInit(): void {
    if (window.innerWidth < 1024) { // Cambia 1024 por el ancho deseado para activar el carrusel
      this.showCarousel = true;

      const swiper = new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: 5,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
  }

}
