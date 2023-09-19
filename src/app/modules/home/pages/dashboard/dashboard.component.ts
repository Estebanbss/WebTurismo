import { getDownloadURL, getStorage, ref } from '@angular/fire/storage';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/modules/home/services/home.service';
import { Municipio } from 'src/app/core/models/municipio-model';
import { of } from 'rxjs';

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
  'Yaguará', // ... (tu lista de municipios)
  ];

  randomuni = [...this.muni]; // Copia de los municipios

  tilesData: Municipio[] = []; // Array de municipios

  width: { [klass: string]: any } | null | undefined; // Ancho de la pantalla

  private async fetchUrls(): Promise<string[]> {
    // Método para obtener los URLs de las imágenes
    const promises: Promise<string>[] = this.randomuni.map(async (municipio) => {
      const pathReference = ref(this.storage, `Banner/${municipio}.webp`);
      try {
        const url = await getDownloadURL(pathReference);
        return url;
      } catch (error:any) {
        if (error.code === 'storage/object-not-found') {
          console.log(`File doesn't exist for ${municipio}`);
        }
        return ''; // Retornar una cadena vacía en caso de error
      }
    });

    return Promise.all(promises);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.fetchUrls().then((urls) => {
      // Almacenar los URLs en tilesData
      this.tilesData = this.randomuni.map((municipio, index) => ({
        title: municipio,
        img: urls[index],
        alt: `${municipio}image`,
      }));
    });
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
