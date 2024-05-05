import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { RecuperarPasswordComponent } from './pages/recuperar-password/recuperar-password.component';
import { RegistrarUsuarioComponent } from './pages/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './pages/verificar-correo/verificar-correo.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [
    LoginComponent,
    RecuperarPasswordComponent,
    RegistrarUsuarioComponent,
    VerificarCorreoComponent,
    HeaderComponent,

  ],
  imports:[
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireFunctionsModule

  ]

})
export class AuthModule { }
