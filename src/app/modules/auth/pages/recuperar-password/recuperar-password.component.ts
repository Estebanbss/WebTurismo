import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/auth/services/user.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {

  //Creamos el Formulario Reactivo
  recuperarUsuario: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder, //Inyectamos la clase para el formulario
    private userService: UserService, //Inyectamos el servicio con métodos de Firebase y manejo de Errores
    private router: Router //Inyectamos la clase Router para dirigirnos a otros componentes
  ) {
    this.recuperarUsuario = this.fb.group({
      correo: ['', [Validators.required, Validators.email]]
    })



  }

  ngOnInit(): void {
    let user = this.userService.usuarioActual();

    this.userService.usuarioIniciado()
    console.log("works")

    } ;


  recuperar() {
    const email = this.recuperarUsuario.value.correo;

    this.loading = true;

    this.userService.recuperar(email)
      .then(() => {
        alert('Se te ha enviado un correo a tu cuenta para restablecer la contraseña');
        this.router.navigate(['auth/login']);
      })
      .catch((error) => {
        this.loading = false;
        // Metodo para gestionar los errores
        alert(this.userService.firebaseError(error.code)); //Manejo de Errores
        // El único error que puede aparecer es que la cuenta no está registrada
      })
  }

}
