import { getDownloadURL, getStorage } from '@angular/fire/storage';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/modules/home/services/home.service';
import { Municipio } from 'src/app/core/models/municipio-model';
import { ref } from '@angular/fire/storage';
import { path } from '@angular-devkit/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private homeService: HomeService, // Inyecta el servicio HomeService
    private router: Router, // Inyecta el servicio Router
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}
  storage = getStorage(); // Variable para almacenar el storage de Firebase
  dataUser: any; // Variable para almacenar los datos del usuario
  admin: string = 'juanesbs2003@hotmail.com';

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
    'Yaguará',
  ];

  randomuni = [...this.muni]; // Copia de los municipios

  tilesData: Municipio[] = []; // Array de municipios

  width: { [klass: string]: any } | null | undefined; // Ancho de la pantalla

  private async iter(): Promise<void> {
    // Método para iterar los municipios
    this.randomuni.sort(function () {
      return Math.random() - 0.5;
    }); // Ordena los municipios de forma aleatoria
    for (let i = 0; i < this.randomuni.length; i++) {
      const pathReference = ref(this.storage, "Banner/" + this.randomuni[i] + ".webp");
      console.log(pathReference)
      // Itera los municipios
      try {
        const url = await getDownloadURL(pathReference);
        this.tilesData.push({
          // Añade los municipios al array de municipios
          title: this.randomuni[i], // Título del municipio
          img: url, // Imagen del municipio
          alt: this.randomuni[i] + 'image', // Alt de la imagen
        });
      } catch (error:any) {
        if (error.code === "storage/object-not-found") {
          console.log("file doesn't exist");
        }
      }
    }
  }


  ngAfterViewInit(): void {
    this.iter(); // Llama al método iter
  }

  ngOnInit(): void {

  }

  logOut(): void {
    this.homeService // Cierra la sesión
      .cerrarSesion()
      .then(() => {
        // Si se cierra la sesión
        this.router.navigate(['auth/login']); // Redirige al login
      })
      .catch((error) => console.log(error)); // Si no se cierra la sesión, muestra el error
  }
}
