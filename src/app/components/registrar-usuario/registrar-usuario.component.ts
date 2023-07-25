import { Component } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'; //Formularios - Validación

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent {
  //Parametro para el formulario
  registrarUsuario: FormGroup;

  /*Hacemos inyección de dependencia de una clase en el constructor*/
  constructor(private fb: FormBuilder) {
    this.registrarUsuario = this.fb.group({
      //Pasamos un objeto con las configuración del formulario
      // nombreCampo: ['ValorInicio', validación]
      email: ['', Validators.required],
      password: ['', Validators.required],
      repetirPassword: ['', Validators.required],
    })
  }

  // Método que se ejecuta desde el template para registrar usuarios
  registrar() {
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirPassword = this.registrarUsuario.value.repetirPassword;
    console.log({email, password, repetirPassword});
  }

}
