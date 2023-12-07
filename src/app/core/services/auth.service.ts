import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, signOut, deleteUser, updateProfile,  } from '@angular/fire/auth';
import { Firestore, QuerySnapshot, collection, collectionData, doc, getDoc, getDocs, getFirestore, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Users } from '../common/place.interface';
import { deleteDoc } from '@angular/fire/firestore';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getDownloadURL } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private afAuth: Auth,    private firestore: Firestore,
  ) {this.onAuthStateChanged((user, userDetails) => {this.uid = user.uid }) }

    uid!: string;
    storage = getStorage();
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
          userDetails = await this.fetchUserDetails(user.uid);
          this.setUserDetailsInLocalStorage(user.uid, userDetails);
        } else {
        }
        callback(user, userDetails);
      } else {
        callback(null, null);
      }
    });
  }


  getUID(): Promise<string> {
    return new Promise<string>((resolve) => {
      onAuthStateChanged(this.afAuth, async (user) => {
        if (user) {
          resolve(user.uid);
        } else {
          resolve("");
        }
      });
    });
  }

  obtenerUsuarios(): Observable<Users[]> {
    const usuariosRef = collection(this.firestore, 'users');

    const q = query(usuariosRef, orderBy('nombre', 'asc'));

    return collectionData(q, { idField: 'uid' }) as Observable<Users[]>;
  }

  obtenerUsuario(uid: string): Observable<Users> {
    const usuarioRef = doc(this.firestore, 'users', uid);
    return getDoc(usuarioRef) as unknown as Observable<Users>;
   }

   obtenerUsuarioPorUserName(userName: string): Observable<Users[]> {
    const usuariosRef = collection(this.firestore, 'users');
    const queryByUserName = query(usuariosRef, where('userName', '==', userName));

    return new Observable<Users[]>((observer) => {
      getDocs(queryByUserName).then((snapshot: QuerySnapshot<any>) => {
        const users: Users[] = [];
        snapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() } as Users);
        });
        observer.next(users);
      });
    });
  }

  eliminarUsuario(uid: string): Promise<void> {
    const usuarioRef = doc(this.firestore, 'users', uid);
    return deleteDoc(usuarioRef);
  }

  actualizarUsuario(uid: string, usuario: any): Promise<void> {
    const usuarioRef = doc(this.firestore, 'users', uid);
    return updateDoc(usuarioRef, usuario);
  }

  async actualizarFotoPerfil(uid: string, photo: File) {
    const filePath = `users/pfp/${uid}`;
    const storageRef = ref(this.storage, filePath);

    try {
      // Subir la foto al Storage
      const snapshot = await uploadBytes(storageRef, photo);

      // Obtener la URL de descarga de la foto subida
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Actualizar la URL en Firestore
      const userRef = doc(this.firestore, 'users', uid);
      await updateDoc(userRef, { fotoUser: downloadURL });
      this.updateUserDetailsInLocalStorage().then(() => {  window.location.reload();})
      return alert('Foto actualizada!')
    } catch (error) {
      console.error('Error al actualizar la foto de perfil:', error);
      throw error;
    }

  }

  async actualizarBanner(uid: string, photo: File) {
    const filePath = `users/banner/${uid}`;
    const storageRef = ref(this.storage, filePath);

    try {
      // Subir la foto al Storage
      const snapshot = await uploadBytes(storageRef, photo);

      // Obtener la URL de descarga de la foto subida
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Actualizar la URL en Firestore
      const userRef = doc(this.firestore, 'users', uid);
      await updateDoc(userRef, { bannerImg: downloadURL });
      this.updateUserDetailsInLocalStorage().then(() => {  window.location.reload();});
      return alert('Banner actualizado!')
    } catch (error) {
      console.error('Error al actualizar el banner:', error);
      throw error;
    }
  }

  async updateUserDetailsInLocalStorage() {

    const userDetails = await this.fetchUserDetails(this.uid);
    if (userDetails) {
      const uid = userDetails.uid;
      this.setUserDetailsInLocalStorage(uid, userDetails);

    }
  }

  async fetchUserDetails(uid: string): Promise<any> {
    const firestore = getFirestore();
    const docRef = doc(firestore, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      updateProfile(this.afAuth.currentUser!, { displayName: docSnap.data()!['nombre'], photoURL: docSnap.data()!['fotoUser'], })
      return docSnap.data();
    } else {
      console.error('No se encontraron detalles del usuario.');
      return null;
    }
  }

   getUserDetailsFromLocalStorage(uid: string): any {
    const userDetails = localStorage.getItem(`userDetails-${uid}`);
    return userDetails ? JSON.parse(userDetails) : null;
  }

  setUserDetailsInLocalStorage(uid: string, userDetails: any): void {
    localStorage.setItem(`userDetails-${uid}`, JSON.stringify(userDetails));
  }

  async logout(): Promise<void> {
    try {
      const user = this.afAuth.currentUser;
      await signOut(this.afAuth);
      if (user) {
        localStorage.clear();

      }
      console.log('Caché limpiado después de cerrar sesión.');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }
  private sharedData: any;

  setData(data: any) {
    this.sharedData = data;
  }

  getData(): any {
    return this.sharedData;
  }
}
