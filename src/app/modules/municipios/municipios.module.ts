import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MunicipiosRoutingModule } from './municipios-routing.module';
import { MunicipiosComponent } from './pages/municipios/municipios.component';
import { NavfooterModule } from 'src/app/shared/components/navfooter/navfooter.module';
import { NavheaderModule } from 'src/app/shared/components/navheader/navheader.module';


@NgModule({
  declarations: [
    MunicipiosComponent,


  ],

  imports: [
    CommonModule,
    MunicipiosRoutingModule,
    NavfooterModule,
    NavheaderModule
  ]

})
export class MunicipiosModule { }
