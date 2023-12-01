import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { ModaleditComponent } from './modaledit/modaledit.component';

const routes: Routes = [

  {
    path: '', // Este es el path relativo al path definido en el AppRoutingModule
    component: ProfileComponent, // El componente principal para esta sección
    children: [
      { path: 'edit', component: ModaleditComponent }, // Ruta para el componente Gallery

    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
