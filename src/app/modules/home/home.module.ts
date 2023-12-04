import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms'; //Formularios Reactivos

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {ScrollingModule}from '@angular/cdk/scrolling'




@NgModule({

  declarations: [

    DashboardComponent,


   ],

  imports: [
    CommonModule,
    HomeRoutingModule,
    NgOptimizedImage,
    SharedModule,
    ScrollingModule,
    ReactiveFormsModule



  ]
})

export class HomeModule { }
