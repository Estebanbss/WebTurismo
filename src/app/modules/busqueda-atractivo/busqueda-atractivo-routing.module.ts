import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusquedaAtractivoComponent } from './pages/busqueda-atractivo.component';

const routes: Routes = [

  {
    path:"",
    children: [
      {path: '**', component: BusquedaAtractivoComponent},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusquedaAtractivoRoutingModule { }
