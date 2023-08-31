import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/auth/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
    this.userService.usuarioIniciado();
  }

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

  //Se ejecuta el login con el envío del Formulario
  login() {
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;
    // console.log({email, password});

    // Activamos el spinner un momento antes de la promesa, para que en el momento en que esperamos la respuesta se muestre que está pensando el programa
    this.loading = true;

    //Se ejecuta la lógica de Firebase para el login
    this.userService.login(email, password)
      .then((response) => {
        //En el if preguntamos si el usuario está verificado
        if(response.user?.emailVerified) {
          //Redireccionamos al Dashboard
          this.router.navigate(['/home/dashboard']);
        } else {
          // Redireccionamos al componente Verificar Correo
          this.router.navigate(['/verificar-correo']);
        }
      })
      .catch((error) => {
        this.loading = false; // Spinner
        // Metodo para gestionar los errores Login
        alert(this.userService.firebaseError(error.code)); //Manejo de Errores
        console.log(error);
      });

  }

  //LogIn con Servicio de Google
  loginWithGoogle() {
    this.userService.loginConGoogle()
      .then(response => {
        //En caso de que el logeo sea exitoso se envía al/home dashboard
        // console.log(response.user);
        this.router.navigate(['/home/dashboard']);
      })
      .catch(error => {
        console.log(error);
      })
  }




}

