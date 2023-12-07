import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-modaledit',
  templateUrl: './modaledit.component.html',
  styleUrls: ['./modaledit.component.css']
})
export class ModaleditComponent {

constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService,private cdr: ChangeDetectorRef,private sanitizer: DomSanitizer) {this.authService.onAuthStateChanged((user, userDetails) => {this.userauth = user;}) }
  profileId!: string;
  portadaFile!: File;
  modalPf: boolean = false;
  modalBanner!: boolean;
  user:any;
  userauth:any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  buttonModal() {

    this.router.navigate(['../'], { relativeTo: this.route })

  }

  buttonModal2() {

    this.modalPf = false;
    this.fotoSeleccionada = null;
    this.modalBanner = false;
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

  turnBanner(){
    this.modalBanner = true;
  }

  actualizarUsuario(choose: boolean, user?:any){
    if(choose){
      this.authService.actualizarUsuario(user.uid, user);
      this.authService.updateUserDetailsInLocalStorage().then(() => {
        this.buttonModal();
        setTimeout(() => {
          window.location.reload();
        }, 800); // Tiempo en milisegundos (1 segundo en este caso)
      });
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
  this.imageChangedEvent = event;
  if (files && files.length > 0) {
    setTimeout(() => {
      this.fotoSeleccionada = files[0];
      this.cdr.detectChanges(); // Notificar a Angular sobre el cambio
    }, 0);
  }
}



previewImage: any = '';

imageCropped(event: ImageCroppedEvent) {
  this.previewImage = event.objectUrl
  this.croppedImage = event.blob; // O event.objectUrl dependiendo de lo que retorne ngx-image-cropper
}


imageLoaded(image: LoadedImage) {
    // show cropper
}
cropperReady() {
    // cropper ready
}
loadImageFailed() {
    // show message
}

actualizarImage(uid: string) {
  if (this.croppedImage) {
      this.authService.actualizarFotoPerfil(uid, this.croppedImage).then(() => {
          this.buttonModal2();
          this.buttonModal();

      });
  }
}

actualizarBanner(uid: string) {
  if (this.croppedImage) {
      this.authService.actualizarBanner(uid, this.croppedImage).then(() => {
          this.buttonModal2();
          this.buttonModal();

      });
  }
}


}
