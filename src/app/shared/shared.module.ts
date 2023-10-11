import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NavheaderComponent } from './components/navheader/navheader.component';
import { NavfooterComponent } from './components/navfooter/navfooter.component';
import { SharedRoutingModule } from './shared-routing.module';
import { ButtonCarouselComponent } from './components/button-carousel/button-carousel.component';


@NgModule({
  declarations: [
    SpinnerComponent,
    NavheaderComponent,
    NavfooterComponent,
    ButtonCarouselComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,

  ],
  exports: [
    SpinnerComponent,
    NavheaderComponent,
    NavfooterComponent,
    ButtonCarouselComponent
  ]
})
export class SharedModule {

 }
