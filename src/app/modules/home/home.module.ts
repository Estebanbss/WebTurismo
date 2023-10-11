import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({

  declarations: [

    DashboardComponent,


   ],

  imports: [
    CommonModule,
    HomeRoutingModule,
    NgOptimizedImage,
    SharedModule



  ]
})

export class HomeModule { }
