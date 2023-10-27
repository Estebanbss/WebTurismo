
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-verificar-correo',
  templateUrl: './verificar-correo.component.html',
  styleUrls: ['./verificar-correo.component.css']
})
export class VerificarCorreoComponent implements OnInit {

  constructor (private user: UserService, private titleService: Title){}


  ngOnInit(): void {
this.titleService.setTitle('Pal\'Huila - Verifica tu correo!');
  }



}
