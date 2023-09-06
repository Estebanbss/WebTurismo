import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NavheaderComponent } from './components/navheader/navheader.component';
import { NavfooterComponent } from './components/navfooter/navfooter.component';
import { SharedRoutingModule } from './shared-routing.module';


@NgModule({
  declarations: [
    SpinnerComponent,
    NavheaderComponent,
    NavfooterComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,

  ],
  exports: [
    SpinnerComponent,
    NavheaderComponent,
    NavfooterComponent
  ]
})
export class SharedModule {

 }
