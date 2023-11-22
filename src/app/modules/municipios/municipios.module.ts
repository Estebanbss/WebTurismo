import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { MunicipiosRoutingModule } from './municipios-routing.module';
import { MunicipiosComponent } from './pages/municipios.component';

import { SharedModule } from 'src/app/shared/shared.module';

import {NgxPaginationModule} from 'ngx-pagination';
import { FiltroPorServiciosPipe } from './pipes/filtro-por-servicios.pipe'; // <-- import the module
import { FormsModule } from '@angular/forms';
import { FiltroTextoPipe } from './pipes/filtro-texto.pipe';



@NgModule({
  declarations: [
    MunicipiosComponent,
    FiltroPorServiciosPipe,
    FiltroTextoPipe


  ],

  imports: [
    CommonModule,
    MunicipiosRoutingModule,
    SharedModule,
    NgxPaginationModule,
    NgOptimizedImage,
    FormsModule,
  ]

})
export class MunicipiosModule { }
