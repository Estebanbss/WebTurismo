import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModaleditComponent } from './modaledit/modaledit.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    ProfileComponent,
    ModaleditComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    SharedModule,
    ImageCropperModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class PerfilModule { }
