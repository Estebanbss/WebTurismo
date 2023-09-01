import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavfooterComponent } from './components/navfooter/navfooter.component';
import { NavheaderComponent } from './components/navheader/navheader.component';
import { SpinnerComponent } from './components/spinner/spinner.component';


@NgModule({
  declarations: [
    NavfooterComponent,
    NavheaderComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavfooterComponent,
    NavheaderComponent,
    SpinnerComponent,
  ]
})
export class SharedModule {

 }
