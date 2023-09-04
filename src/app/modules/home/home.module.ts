import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { ButtonCarouselComponent } from './components/button-carousel/button-carousel.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({

  declarations: [
    DashboardComponent,
    ButtonCarouselComponent
   ],

  imports: [
    CommonModule,
    HomeRoutingModule,
  ]

})



export class HomeModule { }
