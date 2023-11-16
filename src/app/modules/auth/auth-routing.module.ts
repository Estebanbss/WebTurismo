import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrarUsuarioComponent } from './pages/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './pages/verificar-correo/verificar-correo.component';
import { RecuperarPasswordComponent } from './pages/recuperar-password/recuperar-password.component';


const routes: Routes = [

  {
    path: "",

    children: [
      { path: 'login', component: LoginComponent},
      { path: 'registrar-usuario', component: RegistrarUsuarioComponent},
      { path: 'verificar-correo', component: VerificarCorreoComponent},
      { path: 'recuperar-password', component: RecuperarPasswordComponent},
      {path: "**", redirectTo: "login"}
    ]

  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
