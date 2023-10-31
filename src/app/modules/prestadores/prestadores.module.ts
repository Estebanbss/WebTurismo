import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrestadorComponent } from './pages/prestador.component';
import { NgOptimizedImage } from '@angular/common';
import { PrestadoresRoutingModule } from './prestadores-routing.module';


@NgModule({
  declarations: [PrestadorComponent],
  imports: [
    CommonModule,
    PrestadoresRoutingModule,
    SharedModule,
    NgOptimizedImage,
  ]
})
export class PrestadoresModule { }
