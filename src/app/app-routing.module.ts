import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/Logeo/login/login.component';
import { RegistrarUsuarioComponent } from './components/Logeo/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './components/Logeo/verificar-correo/verificar-correo.component';
import { RecuperarPasswordComponent } from './components/Logeo/recuperar-password/recuperar-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'registrar-usuario', component: RegistrarUsuarioComponent},
  { path: 'verificar-correo', component: VerificarCorreoComponent},
  { path: 'recuperar-password', component: RecuperarPasswordComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'admin-dashboard', component: AdminDashboardComponent},
  { path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
