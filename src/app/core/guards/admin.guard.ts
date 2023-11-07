import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getAuth } from '@angular/fire/auth';
import { doc, getFirestore, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class adminGuard implements CanActivate {

  constructor(private router: Router) {}

  async canActivate(): Promise<boolean> {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      console.log(auth.currentUser)
      if (!auth.currentUser) {
        // Si el usuario no está autenticado, redirige a la página de inicio de sesión.
        this.router.navigate(['/login']);
        return false;
      }

      const firestore = getFirestore();
      const docRef = doc(firestore, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data()?.['rol']) {
        const userRol = docSnap.data()['rol'];
        if (userRol === 'admin' || userRol === 'superadmin') {
          return true; // Usuario con rol admin o superadmin.
        }
      }

      // Redirige al usuario a la página de inicio.
      this.router.navigate(['/home']);
      return false;
    } catch (error) {
      console.error('Error while fetching user data:', error);
      // Maneja el error, por ejemplo, redirigiendo a una página de error.
      this.router.navigate(['/error']);
      return false;
    }
  }
}
