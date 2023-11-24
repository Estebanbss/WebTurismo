import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusquedaPrestadorComponent } from './pages/busqueda-prestador.component';

const routes: Routes = [

  {
    path:"",
    children: [
      {path: '**', component: BusquedaPrestadorComponent},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusquedaPrestadorRoutingModule { }
