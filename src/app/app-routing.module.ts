// import { PrestadoresModule } from './modules/prestadores/prestadores.module';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes} from '@angular/router';
// import { QuicklinkStrategy } from 'ngx-quicklink'; //libreria para la estrategia de precarga de modulos
import { authGuard } from './core/guards/auth.guard';
import { homeGuard } from './core/guards/home.guard';
import { MunicipioGuard } from './core/guards/municipio.guard';
import { adminGuard } from './core/guards/admin.guard';
import { PrestadorGuard } from './core/guards/prestador.guard';
import { UserGuard } from './core/guards/user.guard';
import { AtractivoGuard } from './core/guards/atractivo.guard';


const routes: Routes = [

  { path: "home", canActivate:[authGuard], loadChildren:() => import("./modules/home/home.module").then((m) => m.HomeModule)},

  { path: "dashboard-admin", canActivate:[authGuard,adminGuard],  loadChildren: () => import('./modules/dashboard-admin/dashboard-admin.module').then( m => m.DashboardAdminModule )},

  { path: "municipios/:id", canActivate:[authGuard, MunicipioGuard], loadChildren:() => import("./modules/municipios/municipios.module").then((m) => m.MunicipiosModule)},

  { path: "busqueda-prestador", canActivate:[authGuard], loadChildren:() => import("./modules/busqueda-prestador/busqueda-prestador.module").then((m) => m.BusquedaPrestadorModule)},

  { path: "prestadores/:municipio/:prestador", canActivate:[authGuard,PrestadorGuard], loadChildren:() => import("./modules/prestadores/prestadores.module").then((m) => m.PrestadoresModule)},

  { path: "atractivos/:municipio/:atractivo", canActivate:[authGuard,AtractivoGuard], loadChildren:() => import("./modules/atractivos/atractivos.module").then((m) => m.AtractivosModule)},

  { path: "profile/:id", canActivate:[authGuard, UserGuard], loadChildren:() => import("./modules/perfil/perfil.module").then((m) => m.PerfilModule)},

  { path: "auth", canActivate:[homeGuard],  loadChildren:() => import("./modules/auth/auth.module").then((m) => m.AuthModule)},

  { path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

