import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  //Parametro para el formulario
  loginUsuario: FormGroup;
  //Para el Manejo del Spinner colocamos el código
  loading: boolean = false;

  constructor(
    private fb: FormBuilder, //Inyectamos la clase para el formulario
    private userService: UserService, //Inyectamos el servicio con métodos de Firebase y manejo de Errores
    private router: Router //Inyectamos la clase Router para dirigirnos a otros componentes
  ) {
    this.loginUsuario = this.fb.group({
      //En el template colocamos las propiedades para traer los valores
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  login() {
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;
    // console.log({email, password});

    // Activamos el spinner un momento antes de la promesa, para que en el momento en que esperamos la respuesta se muestre que está pensando el programa
    this.loading = true;

    //Se ejecuta la lógica de Firebase para el login
    this.userService.login(email, password)
      .then((response) => {
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        this.loading = false; // Spinner
        // Metodo para gestionar los errores Login
        alert(this.userService.firebaseError(error.code)); //Manejo de Errores
        console.log(error);
      });

  }

}
