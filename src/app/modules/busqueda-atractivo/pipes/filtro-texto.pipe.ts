import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroText'
})
export class FiltroTextoPipe implements PipeTransform {

  transform(prestadoresYAtractivos: any[], inputext: string): any[] {
    if (!inputext) {
      return prestadoresYAtractivos;
    }
    inputext = inputext.toLowerCase();
    return prestadoresYAtractivos.filter(item =>
      this.quitarTildes(item.name.toLowerCase()).includes(inputext) ||
      this.quitarTildes(item.municipio.toLowerCase()).includes(inputext) ||
      this.quitarTildes(item.servicios?.toLowerCase()).includes(inputext) ||
      this.quitarTildes(item.bienOLugar?.toLowerCase()).includes(inputext)
    );

  }

  quitarTildes(str?: any) {
    if (!str) {
      return ''; // O cualquier otro valor por defecto que desees
    }
    return str
      .replace(/[áäâà]/g, 'a')
      .replace(/[éëêè]/g, 'e')
      .replace(/[íïîì]/g, 'i')
      .replace(/[óöôò]/g, 'o')
      .replace(/[úüûù]/g, 'u')
      .replace(/[ñ]/g, 'n')
      .replace(/[ç]/g, 'c');
  }

}
