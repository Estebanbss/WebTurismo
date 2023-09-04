import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { NavheaderComponent } from './components/navheader/navheader.component';
import { NavfooterComponent } from './components/navfooter/navfooter.component';
import { ButtonCarouselComponent } from './components/button-carousel/button-carousel.component';


@NgModule({

  declarations: [
    NavfooterComponent,
    NavheaderComponent,
    ButtonCarouselComponent
   ],

  imports: [
    CommonModule,
    HomeRoutingModule,
  ]

})



export class HomeModule { }
