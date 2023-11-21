import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  //Lo que traemos de Algolia
  results: any[] = [];

  constructor(
    private searchService: SearchService,
    private router: Router
    )
    {

  }

  onSearch($event: any) {
    // Obtiene el valor del input y verifica que no sea una cadena vacía
    const query = $event.target?.value;
    if (query) {
      // Si hay una consulta, llama al servicio de búsqueda para Prestadores
      this.searchService.search(query).then(res => {
        this.results = res.hits;
        console.log(this.results);
      }).catch(error => {
        console.error('Error en la búsqueda:', error);
      });

      // Llama al servicio de búsqueda para Atractivos
      this.searchService.search2(query).then(res => {
        // Asumiendo que quieres combinar los resultados de ambos servicios
        this.results = [...this.results, ...res.hits];
        console.log(this.results);
      }).catch(error => {
        console.error('Error en la búsqueda:', error);
      });
    } else {
      // Si la consulta está vacía, puedes optar por limpiar los resultados existentes
      this.results = [];
    }
  }

  //? Método para Navegar al detalle de Municipio
  navigate(item: any) {
    //Validamos hacia qué componente deseamos direccionar
    if ('servicios' in item) { //*Validación para Prestadores
      this.router.navigate(['prestadores', this.capitalizeFirstLetter(item.municipio), this.capitalizeFirstLetter(item.name)]);
    } else if ('bienOLugar' in item) { //*Validación para Atractivos
      this.router.navigate(['atractivos', this.capitalizeFirstLetter(item.municipio), this.capitalizeFirstLetter(item.name)]);
    }
  }

  capitalizeFirstLetter(inputString: string): string {
    if (inputString.length === 0) {
      return inputString;
    }
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }


}
