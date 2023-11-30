import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { BusquedaAtractivoRoutingModule } from './busqueda-atractivo-routing.module';
import { BusquedaAtractivoComponent } from './pages/busqueda-atractivo.component';

import { SharedModule } from 'src/app/shared/shared.module';

import {NgxPaginationModule} from 'ngx-pagination';
import { FiltroPorServiciosPipe } from './pipes/filtro-por-servicios.pipe'; // <-- import the module
import { FormsModule } from '@angular/forms';
import { FiltroTextoPipe } from './pipes/filtro-texto.pipe';




@NgModule({
  declarations: [
    BusquedaAtractivoComponent,
    FiltroPorServiciosPipe,
    FiltroTextoPipe
  ],

  imports: [
    CommonModule,
    BusquedaAtractivoRoutingModule,
    SharedModule,
    NgxPaginationModule,
    NgOptimizedImage,
    FormsModule,
  ]

})
export class BusquedaAtractivoModule { }
