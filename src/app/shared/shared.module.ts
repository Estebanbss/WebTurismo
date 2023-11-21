import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NavheaderComponent } from './components/navheader/navheader.component';
import { NavfooterComponent } from './components/navfooter/navfooter.component';
import { SharedRoutingModule } from './shared-routing.module';
import { ButtonCarouselComponent } from './components/button-carousel/button-carousel.component';
import { NgOptimizedImage } from '@angular/common';
import { SearchComponent } from './components/search/search.component';


@NgModule({
  declarations: [
    SpinnerComponent,
    NavheaderComponent,
    NavfooterComponent,
    ButtonCarouselComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgOptimizedImage

  ],
  exports: [
    SpinnerComponent,
    NavheaderComponent,
    NavfooterComponent,
    ButtonCarouselComponent,
    SearchComponent
  ]
})
export class SharedModule {

 }
