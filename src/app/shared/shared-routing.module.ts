import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavfooterComponent } from './components/navfooter/navfooter.component';
import { NavheaderComponent } from './components/navheader/navheader.component';



const routes: Routes = [

  {
    path:"",
    children: [
      {path: 'navfooter', component: NavfooterComponent},
      {path: 'navheader', component: NavheaderComponent},
      {path: "**", redirectTo: "municipios"}
    ]

  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SharedRoutingModule { }
