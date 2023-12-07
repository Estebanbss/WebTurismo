import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us.component';

const routes: Routes = [

  {
    path:"",
    component: AboutUsComponent,
    children: [
      {path: 'about-us', component: AboutUsComponent},
      {path: "**", redirectTo: "dashboard"}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutUsRoutingModule { }
