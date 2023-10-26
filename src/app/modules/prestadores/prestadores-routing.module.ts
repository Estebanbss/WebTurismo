import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrestadorComponent } from './pages/prestador/prestador.component';

const routes: Routes = [


  {
    path:"",
    children: [
      {path: 'prestadores', component: PrestadorComponent},
      {path: "**", redirectTo: "prestadores"}
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrestadoresRoutingModule { }
