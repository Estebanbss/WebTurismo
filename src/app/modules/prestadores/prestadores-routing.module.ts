import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrestadorComponent } from './pages/prestador.component';
import { ActivatedRoute } from '@angular/router';



const routes: Routes = [


  {
    path:"",
    children: [
      {path: '**', component: PrestadorComponent},

    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrestadoresRoutingModule {


 }
