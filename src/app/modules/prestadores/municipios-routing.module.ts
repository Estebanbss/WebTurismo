import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MunicipiosComponent } from './pages/municipios/municipios.component';

const routes: Routes = [

  {
    path:"",
    children: [
      {path: 'municipios', component: MunicipiosComponent},
      {path: "**", redirectTo: "municipios"}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MunicipiosRoutingModule { }
