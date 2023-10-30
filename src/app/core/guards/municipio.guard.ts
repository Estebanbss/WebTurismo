// Ejemplo de archivo de guarda: municipio.guard.ts

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class MunicipioGuard implements CanActivate {
  // Asegúrate de tener tu lista de municipios aquí, o de obtenerla de algún servicio
  muni: string[] = [ // Array de municipios del Huila
  'Acevedo',
  'Aipe',
  'Algeciras',
  'Altamira',
  'Baraya',
  'Campoalegre',
  'Colombia',
  'Elías',
  'El Agrado',
  'Garzón',
  'Gigante',
  'Guadalupe',
  'Hobo',
  'Íquira',
  'Isnos',
  'La Argentina',
  'La Plata',
  'Nátaga',
  'Neiva',
  'Oporapa',
  'Paicol',
  'Palermo',
  'Palestina',
  'Pital',
  'Pitalito',
  'Rivera',
  'Saladoblanco',
  'Santa María',
  'San Agustín',
  'Suaza',
  'Tarqui',
  'Tello',
  'Teruel',
  'Tesalia',
  'Timaná',
  'Villavieja',
  'Yaguará', // ... (tu lista de municipios)
  ];

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const municipio:any = route.paramMap.get('id');

    if (this.muni.includes(municipio)) {
      return true; // si el municipio es válido, activa la ruta
    } else {
      this.router.navigate(['/municipios/Garzón']); // si no, redirige a "Garzón"
      return false; // y no actives la ruta actual
    }
  }
}
