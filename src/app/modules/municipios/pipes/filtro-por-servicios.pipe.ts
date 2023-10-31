import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPorServicios'
})
export class FiltroPorServiciosPipe implements PipeTransform {

  transform(prestadoresYAtractivos: any[], pipeSelectedServices: any[]): any[] {
    return prestadoresYAtractivos;
  }

}
