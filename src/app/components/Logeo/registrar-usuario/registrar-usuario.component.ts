import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'; //Formularios - Validación
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {
  //Parametro para el formulario
  registrarUsuario: FormGroup;

  //Variable para controlar el template de la carga junto con el *ngIf
  loading: boolean = false;

  /*Hacemos inyección de dependencia de clases y servicios en el constructor*/
  constructor(
    private fb: FormBuilder, //Inyectamos la clase para el formulario
    private userService: UserService, //Inyectamos el servicio con métodos de Firebase y manejo de Errores
    private router: Router //Inyectamos la clase Router para dirigirnos a otros componentes
    ) {
    this.registrarUsuario = this.fb.group({
      //Pasamos un objeto con las configuración del formulario
      // nombreCampo: ['ValorInicio', validación]
      // La Validación es aplicada en el template y los Validators pueden ser diferentes
      email: ['', [Validators.required, Validators.email]],
      //En Firebase el password debe tener mínimo 6 Caracteres
      password: ['', [Validators.required, Validators.minLength(6)]],
      repetirPassword: ['', Validators.required],
    })
  }

 ngOnInit(): void {
   this.userService.usuarioIniciado();
 }
  // Método que se ejecuta desde el template para registrar usuarios
  registrar() {
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirPassword = this.registrarUsuario.value.repetirPassword;
    // console.log({email, password, repetirPassword});

    console.log(this.registrarUsuario);
    //Código en caso de que el usuario no digite la misma contraseña, retorna y no ejecuta el registro
    if(password !== repetirPassword) {
      alert('Las contraseñas no son Iguales');
      return;
    }

    // Sí el usuario pasa el filtro de las contraseñas se activa la carga mientras el método de firebase nos retorna una respuesta.
    this.loading = true;

    this.userService.register(email, password)
      .then( response => {
        this.loading = false; // Se desactiva el ícono de carga
        // Mandamos el user al método de Firebase que envía un correo de Verificación.
        this.userService.verificarCorreo(response.user);
        alert('El usuario fue registrado con éxito');
        alert('Enviamos un correo electrónico para su Verificación');
        // Lo ideal es redireccionar de un componente a otro o del Registro al Login.
        this.router.navigate(['/login']); // Ruteo hacia el login
        //Ya en el login el usuario debe asegurarse de haber Verificado su correo o de otra forma lo manda al componente de Verificar Correo hasta que haga la debida verificación.
      })
      .catch( (error) => {
        this.loading = false; // Se desactiva el ícono de carga.
        // Metodo para gestionar los errores al registrar un usuario.
        alert(this.userService.firebaseError(error.code)); // Enviamos el código de error.
      });
  }



}
