import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  private dbPromise: Promise<IDBDatabase>;

  constructor() {
    this.dbPromise = new Promise((resolve, reject) => {
      const openRequest = indexedDB.open('PalhuilaDB', 1);

      openRequest.onupgradeneeded = (event: any) => {
        const db = openRequest.result;
        if (!db.objectStoreNames.contains('imagesMuni')) {
          db.createObjectStore('imagesMuni', { autoIncrement: true });
        }
      };

      openRequest.onsuccess = () => {
        resolve(openRequest.result);
      };

      openRequest.onerror = () => {
        reject(openRequest.error);
      };
    });
  }


  async getImages(id: string): Promise<string[]> {
    try {
      const db = await this.dbPromise;
      const transaction = db.transaction(id, 'readonly');
      const store = transaction.objectStore(id);
      const request = store.getAll();

      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      throw new Error(`Error retrieving images: ${error}`);
    }
  }

  async saveImages(images: { [key: string]: string }, id: string): Promise<void> {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(id, 'readwrite');
      const store = transaction.objectStore(id);

      if (typeof images === 'object' && Object.keys(images).length > 0) {
        Object.keys(images).forEach((key) => {
          store.put({ id: key, url: images[key] });
        });
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
      } else {
        reject(new Error('Images is either not an object or empty'));
      }
    });
  }



  // async getData(key: string): Promise<any[]> {
  //   const db = await this.dbPromise;
  //   return new Promise((resolve, reject) => {
  //     const transaction = db.transaction([key], 'readonly');
  //     const store = transaction.objectStore(key);
  //     console.log(store)
  //     const request = store.getAll();

  //     request.onsuccess = () => resolve(request.result);
  //     request.onerror = () => reject(request.error);
  //   });
  // }

  // async saveData(key: string, data: any[]): Promise<void> {
  //   const db = await this.dbPromise;
  //   return new Promise((resolve, reject) => {
  //     const transaction = db.transaction([key], 'readwrite');
  //     const store = transaction.objectStore(key);
  //     data.forEach((item, index) => {
  //       store.put({ id: index, ...item });
  //     });

  //     transaction.oncomplete = () => resolve();
  //     transaction.onerror = () => reject(transaction.error);
  //   });
  // }

}
