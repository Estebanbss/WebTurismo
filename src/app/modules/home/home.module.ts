import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';

import { ButtonCarouselComponent } from './components/button-carousel/button-carousel.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavfooterComponent } from 'src/app/modules/home/components/navfooter/navfooter.component';
import { NavheaderComponent } from './components/navheader/navheader.component';

@NgModule({

  declarations: [
    DashboardComponent,
    ButtonCarouselComponent,
    NavfooterComponent,
    NavheaderComponent
   ],

  imports: [
    CommonModule,
    HomeRoutingModule,
    NgOptimizedImage
  ]

})

export class HomeModule { }
