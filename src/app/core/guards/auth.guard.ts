import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.getAuthToken().pipe(
      map((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          return true; // El usuario está autenticado y puede acceder a la ruta
        } else {
          // El usuario no está autenticado, redirigir a la página de inicio de sesión
          this.router.navigate(['/auth/login']);
          return false;
        }
      })
    );
  }
}
