// import { PrestadoresModule } from './modules/prestadores/prestadores.module';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes} from '@angular/router';
// import { QuicklinkStrategy } from 'ngx-quicklink'; //libreria para la estrategia de precarga de modulos
import { authGuard } from './core/guards/auth.guard';
import { homeGuard } from './core/guards/home.guard';
import { MunicipioGuard } from './core/guards/municipio.guard';
import { adminGuard } from './core/guards/admin.guard';


const routes: Routes = [

  { path: "home", canActivate:[authGuard], loadChildren:() => import("./modules/home/home.module").then((m) => m.HomeModule)},

  { path: "dashboard-admin", canActivate:[authGuard,adminGuard],  loadChildren: () => import('./modules/dashboard-admin/dashboard-admin.module').then( m => m.DashboardAdminModule )},

  { path: "municipios/:id", canActivate:[authGuard, MunicipioGuard], loadChildren:() => import("./modules/municipios/municipios.module").then((m) => m.MunicipiosModule)},

  { path: "prestadores/:municipio/:prestador", canActivate:[authGuard], loadChildren:() => import("./modules/prestadores/prestadores.module").then((m) => m.PrestadoresModule)},

  { path: "auth", canActivate:[homeGuard],  loadChildren:() => import("./modules/auth/auth.module").then((m) => m.AuthModule)},

  { path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

