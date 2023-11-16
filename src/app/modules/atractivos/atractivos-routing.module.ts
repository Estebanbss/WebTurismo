import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtractivoComponent } from './pages/atractivo.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { SliderImgComponent } from './pages/slider-img/slider-img.component';

const routes: Routes = [
  {
    path: '', // Este es el path relativo al path definido en el AppRoutingModule
    component: AtractivoComponent, // El componente principal para esta sección
    children: [
      { path: 'gallery', component: GalleryComponent }, // Ruta para el componente Gallery
      { path: 'slider', component: SliderImgComponent }, // Ruta para el componente Slider
      {path: "slider/:option", component: SliderImgComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtractivosRoutingModule { }
