import { MessagesService } from './../../../core/services/messages.service';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild, ChangeDetectorRef, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Event as NavigationEvent } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { ModalServiceService } from 'src/app/core/services/modal-service.service';
import { filter, first, firstValueFrom, last, Subscription, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service'; // Servicio de autenticación

@Component({
  selector: 'app-navheader',
  templateUrl: './navheader.component.html',
  styleUrls: ['./navheader.component.css']
})
export class NavheaderComponent implements OnInit, OnDestroy {
  private modalDataSubscription!: Subscription;
  private modalDataSubscription2!: Subscription;
  @ViewChild('searchNav') searchNav!: ElementRef;
  @ViewChild('searchInput') searchInput!: ElementRef;
  userName!: string | null;
  pfp!: string;
  expanded = false;
  expanded2 = "cerrado";
  adminButton = false;
  userButton = false;
  cachedadminButton = false;
  displayName!: string | null;
  uid!: string | null;
  messages: {id:string,name: string, email: string, message: string, date: string}[] = [];
  messagesRead: {id:string,name: string, email: string, message: string, date: string}[] = [];
  messageButton = false;
  isLoginOrRegister = signal(true);
  actuallyroute = this.router.url;
  isHovered = false;
  filter = 'unread';
  constructor(
    private router: Router,
    private modalService: ModalServiceService,
    private authService: AuthService,
    private MessagesService: MessagesService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {

  }

  ngOnInit() {

  }

  ngDoCheck() {
    if(this.router.url !== this.actuallyroute){
    this.router.url.includes('auth/login') || this.router.url.includes('auth/registrar') ? this.isLoginOrRegister.set(true) : this.isLoginOrRegister.set(false);
    this.actuallyroute = this.router.url;
    this.cdr.detectChanges();
    }
  }

  ngAfterViewInit(){

    this.setupAuthListener();
    this.setupModalSubscriptions();
    if(this.uid){
      this.authService.updateUserDetailsInLocalStorage();

    }
    this.userName = localStorage.getItem('cachedUserName');
    this.userButton = this.userName ? true : false;
    this.getMessages();
    this.getMessagesRead();

  }

  async getMessages() {
    try {
      const data = await firstValueFrom(await this.MessagesService.obtenerTodosLosMensajes());
      const messages = await Promise.all(
        data.map(async (message: any) => {
          const parts = message.message.html.split(',').map((part: string) => part.trim());
          const name = parts[0];
          const email = parts[1];
          const messageContent = parts.slice(2).join(',');
          const date = message.delivery.endTime;
          return {
            id: message.id,
            name: name,
            email: email,
            message: messageContent,
            date: date.toDate().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
          };
        })
      );
      this.messages = messages;
    } catch (error) {
      console.error('Error al obtener mensajes:', error);
    }
  }


  async getMessagesRead() {
    try {
      const data = await firstValueFrom(await this.MessagesService.obtenerTodosLosMensajeLeidos());
      const messages = await Promise.all(
        data.map(async (message: any) => {
          const parts = message.message.html.split(',').map((part: string) => part.trim());
          const name = parts[0];
          const email = parts[1];
          const messageContent = parts.slice(2).join(',');
          const date = message.delivery.endTime;
          return {
            id: message.id,
            name: name,
            email: email,
            message: messageContent,
            date: date.toDate().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
          };
        })
      );
      this.messagesRead = messages;
    } catch (error) {
      console.error('Error al obtener mensajes:', error);
    }
  }


  toContact() {
    this.modalService.navigateToContact();
  }

  readMessage(id: string) {
    this.MessagesService.leerMensaje(id);
    this.cdr.detectChanges();
    this.getMessages();
    this.cdr.detectChanges();
    this.cdr.markForCheck();
    this.getMessagesRead();
    this.cdr.detectChanges();
    this.cdr.markForCheck();
  }

  toAboutUs() {
    this.router.navigate(['/about-us']);
  }

  toLogin() {
    this.router.navigate(['/auth/login']);
  }

  toAdmin(){
    if(this.router.url.includes('dashboard-admin')){

    }
    this.router.navigate(['/dashboard-admin']);
  }

  toHome(){
    this.router.navigate(['/']);
    window.scrollTo(0, 0);
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

  toggleMessages() {
    this.messageButton = !this.messageButton;
    this.cdr.detectChanges();
    this.checking();
  }

  checking(){
    this.cdr.detectChanges();
    setTimeout(() => {
      const headersMessages = document.querySelectorAll('.headerMessage');
      this.cdr.detectChanges();
      headersMessages.forEach((header) => {
        this.cdr.detectChanges();
        const parentElement = header.parentNode as HTMLElement; // Type assertion here
        if (parentElement) {
          // Guarda la altura original del header
          const originalHeight = header.clientHeight;
          parentElement.style.height = originalHeight + 10 + 'px';
          // Añade el listener para el evento 'mouseenter'
          parentElement.addEventListener('mouseenter', () => {
            parentElement.style.height = '400px';
            parentElement.classList.add('transition-height'); // Añade la clase de transición
          });

          // Añade el listener para el evento 'mouseleave'
          parentElement.addEventListener('mouseleave', () => {
            // Vuelve a establecer la altura original
            parentElement.style.height = originalHeight + 10 + 'px';
            parentElement.classList.remove('transition-height'); // Remueve la clase de transición
          });
        }
      });
    });
  }



  ngOnDestroy() {
    this.modalDataSubscription.unsubscribe();
    if (this.modalDataSubscription2) {
      this.modalDataSubscription2.unsubscribe();
    }
  }
}
