import { UserService } from 'src/app/core/services/user.service';
import { Component, Renderer2 } from '@angular/core';
import { OnInit } from '@angular/core';
import { ModalServiceService } from './core/services/modal-service.service';
import { NavigationEnd, Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { doc, getFirestore, setDoc, getDoc } from '@angular/fire/firestore';
import { getAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { IndexedDBService } from './core/services/indexedDB.service';
import { AuthService } from './core/services/auth.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(document:keydown)': 'onKeyDown($event)'
  }
})
export class AppComponent implements OnInit {


  firestore = getFirestore();
  auth = getAuth();
  constructor(private modal: ModalServiceService, private router: Router, private userService: UserService, private renderer: Renderer2,private indexedDBService: IndexedDBService, private authService: AuthService ){



  }

  mostrarBoton: boolean = false;
  userSubscription!: Subscription;
  title = `Pa'lHuila`;
  hasExecuted = false;
  uid!: string;
  usuario!:string;
  ngOnInit(){

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
    window.addEventListener('beforeunload', this.updateFechaUltimoLoginBeforeUnload);
    this.authService.onAuthStateChanged((user, userDetails) => {
      if(!user) return;
      if (user) {
        this.uid = user.uid;
      }
      this.authService.updateUserDetailsInLocalStorage();
    });

  }





  ngAfterViewChecked(){
    if (!this.hasExecuted) {
      this.userService.getCurrentUser(this.auth).then(async (user: any) => {
        if (user) {
          const docuRef = doc(this.firestore, `users/${user.uid}`)
          const docSnap = await getDoc(docuRef);
          this.userService.setRolSubject(docSnap.data()!['rol']);

          if (docuRef) {
            setDoc(docuRef, { fechaUltimoLogin: new Date().toISOString() }, { merge: true });
          }
        }

      });
      this.hasExecuted = true;
    }

   }

  ngOnDestroy(){
      window.removeEventListener('beforeunload', this.updateFechaUltimoLoginBeforeUnload);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollPosition = window.scrollY;
    // Determina la posición en la que deseas mostrar el botón
    const mostrarEnPosicion = 500; // Ejemplo: muestra el botón cuando el usuario ha desplazado 500 píxeles hacia abajo.

    this.mostrarBoton = scrollPosition > mostrarEnPosicion;
  }


  private updateFechaUltimoLoginBeforeUnload = () => {
    this.updateFechaUltimoLogin();
  }

  private updateFechaUltimoLogin() {
    this.userService.getCurrentUser(this.auth).then((user: any) => {
      if (user) {
        const docuRef = doc(this.firestore, `users/${user.uid}`);

        if (docuRef) {
          setDoc(docuRef, { fechaUltimoLogin: new Date().toISOString() }, { merge: true });
        }
      }
    });
  }

  toTop(){
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth" // Agregar "smooth" para un desplazamiento suave
    });
  }

  onKeyDown(event: KeyboardEvent) {
    const targetElement = event.target as HTMLElement;

    // Verifica si el evento no se originó en un elemento con la clase "no-close"
    if (!targetElement.classList.contains('no-close') && targetElement.tagName !=="svg" && targetElement.tagName !=="li" && targetElement.tagName !=="path" && targetElement.tagName !=="span" && targetElement.tagName !=="ul"     && event.key === "Escape") {

      this.modal.setProfileHeader(false);
      this.modal.setTurnMuni(false);
      this.modal.setTurnSliderP(true);
    }


  }


  handleKeydown(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    // Verifica si el evento no se originó en un elemento con la clase "no-close"
    if (!targetElement.classList.contains('no-close') && targetElement.tagName !=="svg"  && targetElement.tagName !=="li"  && targetElement.tagName !=="path" && targetElement.tagName !=="span"  && targetElement.tagName !=="ul" && targetElement.tagName !=="button" && !targetElement.id.includes("buttonProfile") && !targetElement.id.includes("buttonTurn")    ) {

      this.modal.setProfileHeader(false);
      this.modal.setTurnMuni(false);

    }




    if(targetElement.id.includes("buttonTurn")){
      this.modal.setTurnMuni(true);
    }

    }


}
