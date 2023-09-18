import { User } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/modules/auth/services/user.service';

@Component({
  selector: 'app-verificar-correo',
  templateUrl: './verificar-correo.component.html',
  styleUrls: ['./verificar-correo.component.css']
})
export class VerificarCorreoComponent implements OnInit {

  constructor (private user: UserService){}


  ngOnInit(): void {

  }



}
