import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrestadorComponent } from './pages/prestador.component';
import { SliderImgComponent } from './components/slider-img/slider-img.component';





const routes: Routes = [


  {
    path:"",
    children: [
      {path: ':municipio/:prestador', component: PrestadorComponent},
      {path: ':municipio/:prestador/slider/:option', component: SliderImgComponent},
      {path: '**', component: PrestadorComponent},
    ],

  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrestadoresRoutingModule {


 }
