import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivacidadComponent } from './privacidad.component';

const routes: Routes = [
  {
    path:"",
    component: PrivacidadComponent,
    children: [
      {path: 'privacidad', component: PrivacidadComponent},
      {path: "**", redirectTo: "dashboard"}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivacidadRoutingModule { }
