import { Component, OnInit } from '@angular/core';
import { doc, getDoc } from "firebase/firestore";

@Component({
  selector: 'app-municipios',
  templateUrl: './municipios.component.html',
  styleUrls: ['./municipios.component.css']
})
export class MunicipiosComponent implements OnInit{



  constructor() {}
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

  select:string ="Garzón";

  turnMuni:boolean = false;

  expandListMuni(){
    this.turnMuni = !this.turnMuni;
  }

  ngOnInit(): void {



  }


}
