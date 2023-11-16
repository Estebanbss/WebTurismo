import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { ModalServiceService } from 'src/app/core/services/modal-service.service';
import { Subscription } from 'rxjs';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { doc, getDoc, getFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-navheader',
  templateUrl: './navheader.component.html',
  styleUrls: ['./navheader.component.css']
})
export class NavheaderComponent implements OnInit, OnDestroy {
  private modalDataSubscription!: Subscription;
  private modalDataSubscription2!: Subscription;
  auth = getAuth();
  uid!: string | null;
  userName!: string | null;
  pfp!: string;
  expanded?: boolean;
  expanded2?: string;
  dataUser: any;
  adminButton = false;
  userButton = false;
  displayName!: string | null;
  loading!: boolean;

  // Variables de caché para datos de usuario
  cachedUserName: string | null = localStorage.getItem('cachedUserName');
  cachedUserButton = localStorage.getItem('cachedUserButton') === 'true';
  cachedUserPhotoURL: string | null = null;
  authenticated = localStorage.getItem('authenticated') === 'true';

  constructor(private userService: UserService, private router: Router, private modalService: ModalServiceService) {
    onAuthStateChanged(this.auth, (user) => {
      this.authenticated = !!user;
      console.log(this.authenticated);
      localStorage.setItem('authenticated', this.authenticated ? 'true' : 'false');

      if (this.authenticated) {
        console.log("pa obtener foto")
        this.displayName = this.auth.currentUser!.displayName;
        this.obtenerfoto();
      }
    });
  }

  toggleExpanded() {
    this.expanded = this.expanded == true ? this.expanded = false : this.expanded = true;
    this.expanded2 = "cerrado";
  }

  toggleExpanded2() {
    if (this.expanded2 === "cerrado") {
      this.expanded2 = "abierto";
    } else {
      this.expanded2 = "cerrado";
    }
    this.expanded = false;
  }

  logOut() {
    // Limpia el caché
    localStorage.removeItem('cachedUserName');
    localStorage.removeItem('cachedUserButton');
    // ...otros datos en caché

    // Resto de tu código para cerrar sesión
    this.userService.update().then(() => {
      this.userService.cerrarSesion().then(() => {
        this.router.navigate(['/auth/login']);
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
    });
  }


  navigate() {
    this.router.navigate(['/profile', this.userName === null || this.userName === undefined ? this.cachedUserName : this.userName]);
  }

  navigateAdmin() {
    this.router.navigate(['/dashboard-admin']);
  }

  ngOnInit() {
    this.modalDataSubscription = this.modalService.modalPFHeader$.subscribe((value) => {
      if (value === true) {
        this.expanded2 === "abierto" || null ? this.expanded2 = "cerrado" : this.expanded2 = "abierto";
      } else {
        this.expanded2 = "cerrado";
      }
    });

    this.modalDataSubscription2 = this.userService.rolSubject$.subscribe((value) => {
      if (value === "admin" || value === "superadmin") {
        this.adminButton = true;
      }
    });
  }

  async obtenerfoto() {
    console.log("condicion obtener foto")
    if (this.authenticated && (this.cachedUserPhotoURL === null || this.loading === false || this.loading === undefined)) {
      console.log("se cumple la condicion")
      this.pfp = this.auth.currentUser!.photoURL!;
      this.cachedUserPhotoURL = this.pfp;
      this.obtenerUsuario();
      this.loading = true;
      console.log("se asigno la foto y loading true y se va a obtener usuario")
    }
  }

  async obtenerUsuario() {
    console.log("estoy en obtener usuario y verifico caché")
    if (this.authenticated && this.cachedUserName === null) {
      console.log("amigo se obtuvo de firebase y se almacenó en caché")
      const firestore = getFirestore();
      const docRef = doc(firestore, 'users', this.auth.currentUser!.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.userName = docSnap.data()['userName'];
        this.userButton = true;

        this.cachedUserName = this.userName;
        this.cachedUserButton = this.userButton;

        // Almacenar en caché los datos de usuario en localStorage
        localStorage.setItem('cachedUserName', this.cachedUserName!);
        localStorage.setItem('cachedUserButton', this.cachedUserButton ? 'true' : 'false');
      }
    }
    console.log("no sé si se entró en la petición de firebase o se obtuvo de caché")
  }

  ngOnDestroy() {
    // Restaurar el estado de autenticación en localStorage
    localStorage.setItem('authenticated', this.authenticated ? 'true' : 'false');

    if (this.modalDataSubscription) {
      this.modalDataSubscription.unsubscribe();
    }
    if (this.modalDataSubscription2) {
      this.modalDataSubscription2.unsubscribe();
    }
  }
}
