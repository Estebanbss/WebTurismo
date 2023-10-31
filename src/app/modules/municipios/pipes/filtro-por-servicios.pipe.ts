import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPorServicios'
})
export class FiltroPorServiciosPipe implements PipeTransform {

  transform(prestadoresYAtractivos: any[], pipeSelectedServices: any[]): any[] {

    //* El primer caso es cuando no exíste un filtro
    if (pipeSelectedServices.length === 0) {
      //console.log(prestadoresYAtractivos);
      return prestadoresYAtractivos; //Retorna el arreglo tal cual
    } else {
      //console.log(pipeSelectedServices);
      //*TODO: Crear un nuevo arreglo con los objetos que cumplan con el filtro que pide el usuario
      prestadoresYAtractivos = prestadoresYAtractivos.filter((objeto) => {

        //? -> Evitar el error por tíldes, transformar cada string del array de strings en su equivalente string sin tílde
        function quitarTildes(str: any) {
          return str
            .replace(/[áäâà]/g, 'a')
            .replace(/[éëêè]/g, 'e')
            .replace(/[íïîì]/g, 'i')
            .replace(/[óöôò]/g, 'o')
            .replace(/[úüûù]/g, 'u')
            .replace(/[ñ]/g, 'n')
            .replace(/[ç]/g, 'c');
        } //? -> Fin de la función

        //*Primero definir ¿qué es? Prestador o Atractivo
        if('servicios' in objeto) { //* Filtro para Prestadores
          //* Empezamos preparando los 2 arrays de elementos tipo string por los que vamos a filtrar.
          //* Comparar por arreglos de strings, todo en minúscula, sin caracteres especiales ni espacios.
          //? -> Primero debemos crear un arreglo de strings, ya que originalmente se está tomando un sólo string con todos los servicos desde el objeto traido de BD, debemos dividir el string completo en distintos strings, en este punto objeto.servicios es un string y no un array de strings. Necesitamos recorrer un array de strings para hacer la comparación servicio a servicio, no un sólo string junto.
          // * .split(,) nos crea un array de string dividido por comas y .map() aplica a cada elemento del nuevo array un .trim() -> quitando espacios, un .toLowerCase() -> para poner todo en minúscula y el método quitarTildes() -> para quitar caracteres especiales a los string.
          //? -> Servicios del Objeto desde BD
          const arrayDelObjeto = objeto.servicios.split(',').map((service:any) => quitarTildes(service.trim().toLowerCase()));
          //? -> Servicios que pide el usuario
          const arrayDelFiltro = pipeSelectedServices.map((service:any) => quitarTildes(service.trim().toLowerCase()));
          //? -> Aquí verificamos que tengan algún elemento en común y así validar el objeto como integrante de lo que el usuario quiere ver.
          const tieneElementoEnComun = arrayDelObjeto.some((elemento:any) => arrayDelFiltro.includes(elemento));

          if (tieneElementoEnComun) {
            console.log("Los dos arreglos tienen al menos un elemento en común.");
          } else {
            console.log("Los arreglos no tienen elementos en común.");
          }

          //return true;
        } else { //* Filtro para Atractivos

          //return false;
        }



      }) //Final del filtrado

    }
    //*Arreglo Filtrado con los elementos del Usuario
    return prestadoresYAtractivos;
  }

}
