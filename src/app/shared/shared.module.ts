import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavfooterComponent } from './components/navfooter/navfooter.component';
import { NavheaderComponent } from './components/navheader/navheader.component';
import { ButtonCarouselComponent } from './components/button-carousel/button-carousel.component';
import { SpinnerComponent } from './components/spinner/spinner.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavfooterComponent,
    NavheaderComponent,
    ButtonCarouselComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [

  ]
})
export class SharedModule {

 }
