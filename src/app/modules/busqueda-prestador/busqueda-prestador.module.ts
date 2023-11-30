import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { BusquedaPrestadorRoutingModule } from './busqueda-prestador-routing.module';
import { BusquedaPrestadorComponent } from './pages/busqueda-prestador.component';

import { SharedModule } from 'src/app/shared/shared.module';

import {NgxPaginationModule} from 'ngx-pagination';
import { FiltroPorServiciosPipe } from './pipes/filtro-por-servicios.pipe'; // <-- import the module
import { FormsModule } from '@angular/forms';
import { FiltroTextoPipe } from './pipes/filtro-texto.pipe';




@NgModule({
  declarations: [
    BusquedaPrestadorComponent,
    FiltroPorServiciosPipe,
    FiltroTextoPipe


  ],

  imports: [
    CommonModule,
    BusquedaPrestadorRoutingModule,
    SharedModule,
    NgxPaginationModule,
    NgOptimizedImage,
    FormsModule,
  ]

})
export class BusquedaPrestadorModule { }
