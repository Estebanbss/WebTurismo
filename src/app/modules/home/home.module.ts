import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';

import { ButtonCarouselComponent } from './components/button-carousel/button-carousel.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavfooterModule } from 'src/app/shared/components/navfooter/navfooter.module';
import { NavheaderModule } from 'src/app/shared/components/navheader/navheader.module';

@NgModule({

  declarations: [

    DashboardComponent,
    ButtonCarouselComponent,

   ],

  imports: [

    CommonModule,
    HomeRoutingModule,
    NgOptimizedImage,
    NavfooterModule,
    NavheaderModule

  ]
})

export class HomeModule { }
