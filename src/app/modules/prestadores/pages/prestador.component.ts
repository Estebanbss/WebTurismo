import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-prestador',
  templateUrl: './prestador.component.html',
  styleUrls: ['./prestador.component.css']
})
export class PrestadorComponent {
  id1!: string;
  id2!: string;

  constructor(private route: ActivatedRoute, private title: Title, private router: Router) {
    this.title.setTitle('Pal\'Huila - Prestadores!' );


    this.route.params.subscribe(params => {
      // params contendrá los valores de los parámetros de ruta
      this.id1 = this.capitalizeFirstLetter(params['municipio'])
      this.id2 = params['prestador'];


    });
  }

  send() {
    if (this.id2) {
      this.router.navigate(['/prestadores', this.id1, this.id2, 'slider']);
    } else {
      // Realiza alguna acción cuando id2 no tiene un valor, como mostrar un mensaje de error.
    }
  }

  capitalizeFirstLetter(inputString: string): string {
    if (inputString.length === 0) {
      return inputString;
    }
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }



}
