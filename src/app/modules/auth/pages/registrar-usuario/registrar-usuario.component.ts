import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'; //Formularios - Validación
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { Title } from '@angular/platform-browser';
import { doc, getDoc, getFirestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { updateProfile } from '@angular/fire/auth';
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

  firestore = getFirestore();
  /*Hacemos inyección de dependencia de clases y servicios en el constructor*/
  constructor(
    private fb: FormBuilder, //Inyectamos la clase para el formulario
    private userService: UserService, //Inyectamos el servicio con métodos de Firebase y manejo de Errores
    private router: Router,
    private titleService: Title //Inyectamos la clase Router para dirigirnos a otros componentes
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

  Color: string = "stroke-primary-500";
  type: string = "password";
  eye: boolean = true;

  Ojito(){
    this.Color == "stroke-primary-500" ? this.Color = "stroke-primary-600" : this.Color = "stroke-primary-500"
    this.type == "password" ? this.type = "text" : this.type = "password"
    this.eye == true ? this.eye = false : this.eye = true
  }






 ngOnInit(): void {
  this.titleService.setTitle('Pal\'Huila - Registrate!');

 }

 generateRandom9DigitNumber() {
  const min = 100000000; // El valor mínimo de 9 dígitos
  const max = 999999999; // El valor máximo de 9 dígitos
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

capitalizeFirstLetter(inputString: string): string {
  if (inputString.length === 0) {
    return inputString;
  }
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}
  // Método que se ejecuta desde el template para registrar usuarios
  registrar() {
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirPassword = this.registrarUsuario.value.repetirPassword;
    // console.log({email, password, repetirPassword});


    //Código en caso de que el usuario no digite la misma contraseña, retorna y no ejecuta el registro
    if(password !== repetirPassword) {
      alert('Las contraseñas no son Iguales');
      return;
    }

    // Sí el usuario pasa el filtro de las contraseñas se activa la carga mientras el método de firebase nos retorna una respuesta.
    this.loading = true;

    this.userService.register(email, password)
      .then( async response => {
        this.loading = false; // Se desactiva el ícono de carga
        // Mandamos el user al método de Firebase que envía un correo de Verificación.
        this.userService.verificarCorreo(response.user);


        // Lo ideal es redireccionar de un componente a otro o del Registro al Login.
        this.router.navigate(['auth/login']); // Ruteo hacia el login
        //Ya en el login el usuario debe asegurarse de haber Verificado su correo o de otra forma lo manda al componente de Verificar Correo hasta que haga la debida verificación.
        const random9DigitNumber = this.generateRandom9DigitNumber();

        const docuImgpfRef = doc(this.firestore, `users/01profilePictures`)

        const numeroAleatorio = Math.floor(Math.random() * 10) + 1;
        const docuRef = doc(this.firestore, `users/${response.user.uid}`)
        getDoc(docuRef).then(async (doc) => {

          if(doc.exists()){
            updateDoc(docuRef, {fechaUltimoLogin: new Date().toISOString()})
            this.userService.setRolSubject(doc.data()!['rol'])
          }else{
            await getDoc(docuImgpfRef).then((docSnap) => {

              setDoc(docuRef, {
                correo: response.user.email,
                rol: 'usuario',
                nombre: response.user.displayName === null || undefined ? this.capitalizeFirstLetter(response.user.email!.split("@")[0].substring(0,6)) : this.capitalizeFirstLetter(response.user.displayName),

                userName: `${response.user.displayName === null || undefined ? response.user.email?.split("@")[0].substring(0,6) : this.capitalizeFirstLetter( response.user.displayName)}${random9DigitNumber}`,
                // fotoUser: response.user.photoURL,
                fotoUser: docSnap.data()![`${numeroAleatorio}`],
                uid: response.user.uid,
                estado: true,
                fechaCreacion: new Date(response.user.metadata.creationTime!).toISOString(),
                fechaUltimoLogin: new Date(response.user.metadata.lastSignInTime!).toISOString(),
                numeroTel: response.user.phoneNumber === null || undefined ? "0" : response.user.phoneNumber,
                bannerImg: null
              });
              updateProfile(response.user, {photoURL:docSnap.data()![`${numeroAleatorio}`], displayName: response.user.displayName === null || undefined ? this.capitalizeFirstLetter(response.user.email!.split("@")[0].substring(0,6)) : this.capitalizeFirstLetter(response.user.displayName)}).then(()=>{ }).catch((error)=>{console.log(error)})

            });



          }

        })


        this.router.navigate(['auth/verificar-correo']); // Ruteo hacia el login
      })
      .catch( (error) => {
        this.loading = false; // Se desactiva el ícono de carga.
        // Metodo para gestionar los errores al registrar un usuario.

      });
  }



}
