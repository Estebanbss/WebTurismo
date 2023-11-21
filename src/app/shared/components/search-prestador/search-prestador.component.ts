import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'app-search-prestador',
  templateUrl: './search-prestador.component.html',
  styleUrls: ['./search-prestador.component.css']
})
export class SearchPrestadorComponent {

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
    } else {
      // Si la consulta está vacía, limpiar los resultados existentes
      this.results = [];
    }
  }

  //? Método para Navegar al detalle de Municipio
  navigate(item: any) {
    //Validamos hacia qué componente deseamos direccionar
    if ('servicios' in item) { //*Validación para Prestadores
      this.router.navigate(['prestadores', this.capitalizeFirstLetter(item.municipio), this.capitalizeFirstLetter(item.name)]);
    }
  }

  capitalizeFirstLetter(inputString: string): string {
    if (inputString.length === 0) {
      return inputString;
    }
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }


}
