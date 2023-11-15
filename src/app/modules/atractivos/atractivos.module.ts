import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AtractivoComponent } from './pages/atractivo.component';
import { NgOptimizedImage } from '@angular/common';
import { AtractivosRoutingModule } from './atractivos-routing.module';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { SliderImgComponent } from './pages/slider-img/slider-img.component';



@NgModule({
  declarations: [AtractivoComponent, GalleryComponent, SliderImgComponent],
  imports: [
    CommonModule,
    AtractivosRoutingModule,
    SharedModule,
    NgOptimizedImage,
  ]
})
export class AtractivosModule { }
