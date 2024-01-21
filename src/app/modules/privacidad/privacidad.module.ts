import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacidadRoutingModule } from './privacidad-routing.module';
import { PrivacidadComponent } from './privacidad.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PrivacidadComponent
  ],
  imports: [
    CommonModule,
    PrivacidadRoutingModule,
    SharedModule
  ]
})
export class PrivacidadModule { }
