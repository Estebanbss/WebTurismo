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

  //? Método para hacer las búsquedas en Angolia
  onSearch($event: any) {
    //*Llamamos al servicio
    this.searchService.search($event.target?.value).then(res => {
      this.results = res.hits;
      console.log(this.results);
    }).catch(error => {
      // Maneja el error adecuadamente
      console.error('Error en la búsqueda:', error);
    });
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
