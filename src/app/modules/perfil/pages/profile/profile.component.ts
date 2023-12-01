import { Component } from '@angular/core';
import { ActivatedRoute, Router,  } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ModalServiceService } from 'src/app/core/services/modal-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute, private modalService: ModalServiceService) {this.auth.onAuthStateChanged((user, userDetails) => {this.userauth = user;}) }
    profileId!: string;
    user:any;
    userauth:any;
    pag:string = "Sitios";
    currentPage: number = 1; // Página actual
    buttonPags: string[] = ["Sitios","Likes"];
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.profileId = params['id'];
      if (this.profileId) {
        this.auth.obtenerUsuarioPorUserName(this.profileId).subscribe((user) => {
          this.user = user[0];
        });
      }
      this.modalService.setProfileHeader(false);
    });
    console.log(this.router.url);
    this.auth.setData(this.router.url);
  }
  buttonPag(option:string){
    this.pag = option;
  }

  modaledit(): void{

    this.router.navigate(['edit'], { relativeTo: this.route })

  }
}
