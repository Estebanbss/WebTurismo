import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { doc, getDoc, getFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: Auth) { }

  getLoggin(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      onAuthStateChanged(this.afAuth, async (user) => {
        if (user && await user.emailVerified) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  onAuthStateChanged(callback: (user: any, userDetails: any) => void) {
    onAuthStateChanged(this.afAuth, async (user) => {
      if (user) {
        let userDetails = this.getUserDetailsFromLocalStorage(user.uid);
        if (!userDetails) {
          console.log('Obteniendo detalles del usuario desde Firebase...');
          userDetails = await this.fetchUserDetails(user.uid);
          this.setUserDetailsInLocalStorage(user.uid, userDetails);
        } else {
          console.log('Detalles del usuario obtenidos del localStorage.');
        }
        callback(user, userDetails);
      } else {
        callback(null, null);
      }
    });
  }

  private async fetchUserDetails(uid: string): Promise<any> {
    const firestore = getFirestore();
    const docRef = doc(firestore, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error('No se encontraron detalles del usuario.');
      return null;
    }
  }

  private getUserDetailsFromLocalStorage(uid: string): any {
    const userDetails = localStorage.getItem(`userDetails-${uid}`);
    return userDetails ? JSON.parse(userDetails) : null;
  }

  private setUserDetailsInLocalStorage(uid: string, userDetails: any): void {
    localStorage.setItem(`userDetails-${uid}`, JSON.stringify(userDetails));
  }

  async logout(): Promise<void> {
    try {
      const user = this.afAuth.currentUser;
      await signOut(this.afAuth);
      if (user) {
        localStorage.removeItem(`userDetails-${user.uid}`);
      }
      console.log('Caché limpiado después de cerrar sesión.');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }
}
