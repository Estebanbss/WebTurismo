import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModaleditComponent } from './modaledit/modaledit.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ModaleditComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    SharedModule,
  ]
})
export class PerfilModule { }
