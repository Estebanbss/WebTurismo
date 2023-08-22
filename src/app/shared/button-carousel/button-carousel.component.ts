import { Component,  AfterViewInit, HostListener  } from '@angular/core';

const carrousel = {


}
@Component({
  selector: 'app-button-carousel',
  templateUrl: './button-carousel.component.html',
  styleUrls: ['./button-carousel.component.css']
})




export class ButtonCarouselComponent {

  cerrado: boolean = false;


  screenWidth: number = window.innerWidth;




  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenWidth = window.innerWidth;
    console.log(this.screenWidth);
    if(this.screenWidth <=874){
      this.cerrado = true;
    }
    else{
      this.cerrado = false;
    }
    console.log(this.cerrado)

  }






}


