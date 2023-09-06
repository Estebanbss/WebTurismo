import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavfooterComponent } from './navfooter.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [NavfooterComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    NavfooterComponent
  ]
})
export class NavfooterModule { }
