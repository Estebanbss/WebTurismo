import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { ModalServiceService } from 'src/app/core/services/modal-service.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service'; // Servicio de autenticación

@Component({
  selector: 'app-navheader',
  templateUrl: './navheader.component.html',
  styleUrls: ['./navheader.component.css']
})
export class NavheaderComponent implements OnInit, OnDestroy {
  private modalDataSubscription!: Subscription;
  private modalDataSubscription2!: Subscription;

  userName!: string | null;
  pfp!: string;
  expanded = false;
  expanded2 = "cerrado";
  adminButton = false;
  userButton = false;
  cachedadminButton = false;
  displayName!: string | null;
  uid!: string | null;

  constructor(
    private router: Router,
    private modalService: ModalServiceService,
    private authService: AuthService,
    private elRef: ElementRef // Inyección del servicio de autenticación
  ) {

  }

  ngOnInit() {
    this.setupAuthListener();
    this.setupModalSubscriptions();
    this.authService.updateUserDetailsInLocalStorage();
    this.userName = localStorage.getItem('cachedUserName');
    this.userButton = this.userName ? true : false;
  }

  toContact() {
    this.modalService.navigateToContact();
  }

  toAboutUs() {
    this.router.navigate(['/about-us']);
  }

  toLogin() {
    this.router.navigate(['/auth/login']);
  }

  private setupAuthListener() {
    this.authService.onAuthStateChanged((user, userDetails) => {
      if (user) {
        this.userButton = true;
        this.displayName = user.displayName.split(" ")[0];
        this.userName = userDetails.userName;
        this.pfp = user.photoURL;
        this.uid = user.uid;
        userDetails.rol === 'admin' || userDetails.rol === "superadmin" ? this.adminButton = true : this.adminButton = false;
      }
    });
  }

  private setupModalSubscriptions() {
    this.modalDataSubscription = this.modalService.modalPFHeader$.subscribe(value => {
      this.expanded2 = value ? "abierto" : "cerrado";
    });
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
    this.expanded2 = this.expanded ? "cerrado" : "abierto";
  }

  logOut() {
    this.authService.logout()
      .then(() => this.router.navigate(['/auth/login']))
      .catch(error => console.error('Error logging out:', error));
  }

  navigate() {
    const userToNavigate = this.userName || localStorage.getItem('cachedUserName');
    this.router.navigate(['/profile', userToNavigate]);
  }

  navigateAdmin() {
    this.router.navigate(['/dashboard-admin']);
  }

  ngOnDestroy() {
    this.modalDataSubscription.unsubscribe();
    if (this.modalDataSubscription2) {
      this.modalDataSubscription2.unsubscribe();
    }
  }
}
