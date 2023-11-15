
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { Title } from '@angular/platform-browser';
import { doc, getFirestore, setDoc } from '@angular/fire/firestore';
import { getAuth, updateProfile } from '@angular/fire/auth';
import { getDoc, updateDoc } from '@firebase/firestore';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
    this.titleService.setTitle('Pal\'Huila - Inicia Sesión!');
  }

  firestore = getFirestore();
  auth = getAuth();


  defaultUser:string | undefined = this.auth.currentUser?.email?.substring(0,6);




  //Parametro para el formulario
  loginUsuario: FormGroup;
  //Para el Manejo del Spinner colocamos el código
  loading: boolean = false;
  Color: string = "stroke-primary-500";
  type: string = "password";
  eye: boolean = true;

  constructor(
    private fb: FormBuilder, //Inyectamos la clase para el formulario
    private userService: UserService, //Inyectamos el servicio con métodos de Firebase y manejo de Errores
    private router: Router,
    private titleService: Title
  ) {
    this.loginUsuario = this.fb.group({
      //En el template colocamos las propiedades para traer los valores
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

  }

  capitalizeFirstLetter(inputString: string): string {
    if (inputString.length === 0) {
      return inputString;
    }
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }



  Ojito(){
    this.Color == "stroke-primary-500" ? this.Color = "stroke-primary-600" : this.Color = "stroke-primary-500"
    this.type == "password" ? this.type = "text" : this.type = "password"
    this.eye == true ? this.eye = false : this.eye = true
  }
  generateRandom9DigitNumber() {
    const min = 100000000; // El valor mínimo de 9 dígitos
    const max = 999999999; // El valor máximo de 9 dígitos
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
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

          const random9DigitNumber = this.generateRandom9DigitNumber();

          const docuImgpfRef = doc(this.firestore, `users/01profilePictures`)

          const numeroAleatorio = Math.floor(Math.random() * 10) + 1;
          const docuRef = doc(this.firestore, `users/${response.user?.uid}`)
          getDoc(docuRef).then(async (doc) => {
            if(doc.exists()){
              updateDoc(docuRef, {fechaUltimoLogin: new Date().toISOString()}).then((response)=>{  this.router.navigate(['/home']);}).catch((error)=>{console.log(error)})
              this.userService.setRolSubject(doc.data()!['rol'])
            }else{
              await getDoc(docuImgpfRef).then((docSnap) => {

                setDoc(docuRef, {
                  correo: response.user.email,
                  rol: 'usuario',
                  nombre: response.user.displayName === null || undefined ? this.capitalizeFirstLetter(response.user.email?.split("@")[0].substring(0,6)) : this.capitalizeFirstLetter(response.user.displayName),

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
                updateProfile(response.user, {photoURL:docSnap.data()![`${numeroAleatorio}`], displayName: response.user.displayName === null || undefined ? response.user.email?.split("@")[0].substring(0,6) : response.user.displayName}).then(()=>{this.router.navigate }).catch((error)=>{console.log(error)}).then((response)=>{  this.router.navigate(['/home']);}).catch((error)=>{console.log(error)})

              });
            }

          })



        } else {
          // Redireccionamos al componente Verificar Correo
          this.router.navigate(['/auth/verificar-correo']);
          this.userService.cerrarSesion();
        }
      })
      .catch((error) => {
        this.loading = false; // Spinner
        // Metodo para gestionar los errores Login

          alert(this.userService.firebaseError(error.code))


      });

  }

  //LogIn con Servicio de Google
  loginWithGoogle() {
    this.userService.loginConGoogle()
      .then(response => {
        console.log(response)
        //En caso de que el logeo sea exitoso se envía al/home dashboard
        // console.log(response.user);


        const random9DigitNumber = this.generateRandom9DigitNumber();

        const docuImgpfRef = doc(this.firestore, `users/01profilePictures`)

        const numeroAleatorio = Math.floor(Math.random() * 10) + 1;

        const docuRef = doc(this.firestore, `users/${response.user?.uid}`)
        getDoc(docuRef).then(async (doc) => {
          if(doc.exists()){
            updateDoc(docuRef, {fechaUltimoLogin: new Date().toISOString()}).then((response)=>{  this.router.navigate(['/home']);}).catch((error)=>{console.log(error)})

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
              updateProfile(response.user, {photoURL:docSnap.data()![`${numeroAleatorio}`], displayName: response.user.displayName === null || undefined ? this.capitalizeFirstLetter(response.user.email!.split("@")[0].substring(0,6)) : response.user.displayName}).then(()=>{ }).catch((error)=>{console.log(error)}).then((response)=>{  this.router.navigate(['/home']);}).catch((error)=>{console.log(error)})

            });
          }
        }).then(()=>{})

      // const addAdminRole =  firebase.functions().httpsCallable('addAdminRole');
      // addAdminRole({ email: 'usuario@example.com' })
      //   .then((result) => {
      //     // Manejar la respuesta, por ejemplo, mostrar un mensaje de éxito
      //     console.log(result.data.message);
      //   })
      //   .catch((error) => {
      //     // Manejar el error, por ejemplo, mostrar un mensaje de error
      //     console.error("Error al invocar la función:", error);
      //   });



      })
      .catch(error => {
        console.log(error);
      })
  }




}

