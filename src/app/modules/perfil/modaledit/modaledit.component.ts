import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';


@Component({
  selector: 'app-modaledit',
  templateUrl: './modaledit.component.html',
  styleUrls: ['./modaledit.component.css']
})
export class ModaleditComponent {

constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService ) {this.authService.onAuthStateChanged((user, userDetails) => {this.userauth = user;}) }
  profileId!: string;
  portadaFile!: File;
  modalPf: boolean = false;
  modalBanner!: boolean;
  user:any;
  userauth:any;
  buttonModal() {

    this.router.navigate(['../'], { relativeTo: this.route })

  }

  buttonModal2() {

    this.modalPf = false;
    this.fotoSeleccionada = null;
  }


  onKeyDown(event: KeyboardEvent) {
    const targetElement = event.target as HTMLElement;

    // Verifica si el evento no se originó en un elemento con la clase "no-close"
    if (!targetElement.classList.contains('no-close') && targetElement.tagName !=="svg" && targetElement.tagName !=="li" && targetElement.tagName !=="path" && targetElement.tagName !=="span" && targetElement.tagName !=="ul"     && event.key === "Escape") {

      this.buttonModal();
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.profileId = this.router.url.split('/')[2];
      if (this.profileId) {
        this.authService.obtenerUsuarioPorUserName(this.profileId).subscribe((user) => {
          this.user = user[0];
        });
      }

    });
  }

  turnPf(){
    this.modalPf = true;
  }

  actualizarUsuario(choose: boolean, user?:any){
    if(choose){
      this.authService.actualizarUsuario(user.uid, user);
      this.authService.updateUserDetailsInLocalStorage();
      this.user(false)
   }else{

      this.user(false)
   }

  }

  selectedImages2: any[] = [];

  crearURL(objeto: Blob): string {
    return window.URL.createObjectURL(objeto);
  }

 fotoSeleccionada: File | null = null;

  uploadFilePortada(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.fotoSeleccionada = files[0];
    }
  }

}
