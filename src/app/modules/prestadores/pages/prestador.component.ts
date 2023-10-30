import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prestador',
  templateUrl: './prestador.component.html',
  styleUrls: ['./prestador.component.css']
})
export class PrestadorComponent {

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      // params contendrá los valores de los parámetros de ruta
      const id1 = params['municipio'];
      const id2 = params['prestador'];

      console.log('Primer ID:', id1);
      console.log('Segundo ID:', id2);
    });
  }

}
