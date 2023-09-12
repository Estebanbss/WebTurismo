import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { RecuperarPasswordComponent } from './pages/recuperar-password/recuperar-password.component';
import { RegistrarUsuarioComponent } from './pages/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './pages/verificar-correo/verificar-correo.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SpinnerModule} from '../../shared/components/spinner/spinner.module';




@NgModule({
  declarations: [
    LoginComponent,
    RecuperarPasswordComponent,
    RegistrarUsuarioComponent,
    VerificarCorreoComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports:[
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SpinnerModule

  ]

})
export class AuthModule { }
