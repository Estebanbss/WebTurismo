import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MunicipiosRoutingModule } from './municipios-routing.module';
import { MunicipiosComponent } from './pages/municipios.component';

import { SharedModule } from 'src/app/shared/shared.module';

import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module



@NgModule({
  declarations: [
    MunicipiosComponent,


  ],

  imports: [
    CommonModule,
    MunicipiosRoutingModule,
    SharedModule,
    NgxPaginationModule
  ]

})
export class MunicipiosModule { }
