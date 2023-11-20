import { Component } from '@angular/core';
import { Users } from 'src/app/core/common/place.interface';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent {
   // Inyección de dependencias
  constructor(private authService: AuthService)  {
    this.authService.onAuthStateChanged((user, userDetails) => {this.rol = userDetails?.rol; console.log(this.rol)});
  }
  mostrarModal = false; // Variable para controlar la visualización del modal
   // Variables para filtros
   filtroNombre: string = '';
   filtroRol: string = ''
   // Variables para paginación
   itemsPorPagina: number = 10;
   paginaActual: number = 1;
   // Variables para ordenar
   usuarios: any[] = [];
   totalAdmins: number = 0;
   totalPaginas: number = 0;
   rol?: string;
   usuarioSeleccionado: string = "";
  //llama la función de obtener usuarios para guardarlo en una variable global llamado usuarios.
  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  //función para obtener los usuarios
  obtenerUsuarios(){
    this.authService.obtenerUsuarios().subscribe((data) => {
      console.log(data)
      this.usuarios = data;
      this.totalAdmins = this.usuarios.filter(usuario => usuario.rol === "admin" || usuario.rol === "superadmin").length;
      console.log(this.totalAdmins)
     });

  }

    // Después de aplicar el filtro o recibir nuevos datos
  actualizarPaginas() {
    const totalUsuariosFiltrados = this.filtrarUsuarios().length;
    this.totalPaginas = Math.ceil(totalUsuariosFiltrados / this.itemsPorPagina);
  }

  filtrarPorNombre(usuario: Users): boolean {
    return usuario.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase());
  }

  filtrarPorRol(usuario: Users): boolean {
    return this.filtroRol === '' || usuario.rol === this.filtroRol;
  }

  filtrarUsuarios(): Users[] {
    return this.usuarios.filter(usuario =>
      (usuario.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase()) ||
      usuario.correo.toLowerCase().includes(this.filtroNombre.toLowerCase()) ||
      usuario.rol.toLowerCase().includes(this.filtroNombre.toLowerCase())) &&
      (this.filtroRol === '' || usuario.rol === this.filtroRol)
    );
  }

  botonesPaginacion(): number[] {
    const totalPaginas = this.totalPaginas; // Usar la cantidad total de páginas actualizada
    let botones: number[] = [];
    this.actualizarPaginas();
    if (totalPaginas <= 7) {
      for (let i = 1; i <= totalPaginas; i++) {
        botones.push(i);
      }
    } else {
      if (this.paginaActual <= 4) {
        botones = [1, 2, 3, 4, 5, totalPaginas];
      } else if (this.paginaActual > totalPaginas - 4) {
        botones = [1,  totalPaginas - 4, totalPaginas - 3, totalPaginas - 2, totalPaginas - 1, totalPaginas];
      } else {
        botones = [1, this.paginaActual - 1, this.paginaActual, this.paginaActual + 1,  totalPaginas];
      }
    }
    return botones;
  }

  obtenerRolesUnicos(): string[] {
    return [...new Set(this.usuarios.map(usuario => usuario.rol))];
  }

    // Función para abrir el modal
    modal(choose: boolean) {
      if(choose){
        this.mostrarModal = true;}
      else{
        this.mostrarModal = false;
       }
    }

    borrarUsuario(choose: boolean, uid: string){
      console.log(uid)
      if(choose){

        console.log("Usuario borrado")
        this.modal(false)
     }else{
        console.log("Usuario no borrado")
        this.modal(false)
     }

    }
}
