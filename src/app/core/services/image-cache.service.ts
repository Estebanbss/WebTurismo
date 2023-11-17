import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageCacheService {
  private cache = new Map<string, { imgBlobUrl: string, timestamp: number }>();
  private totalSize = 0;
  private MAX_CACHE_SIZE = 200 * 1024 * 1024; // 50 MB, ajusta según tus necesidades


  constructor() {
    this.estimateStorageLimit();
  }

  private async estimateStorageLimit() {
    if (navigator.storage && navigator.storage.estimate) {
      const estimate = await navigator.storage.estimate();
      console.log(estimate.quota)
      if (estimate.quota) {
        this.MAX_CACHE_SIZE = estimate.quota * 0.7; // Usar 90% del espacio estimado
      }
    }
  }


  async getImage(url: string): Promise<string> {
    const cachedEntry = this.cache.get(url);
    if (cachedEntry) {
      return cachedEntry.imgBlobUrl;
    }

    const response = await fetch(url);
    const blob = await response.blob();
    const imageBlobUrl = URL.createObjectURL(blob);
    this.addToCache(url, imageBlobUrl, blob.size);

    return imageBlobUrl;
  }


  private addToCache(url: string, imgBlobUrl: string, size: number) {
    this.totalSize += size;
    this.cache.set(url, { imgBlobUrl, timestamp: Date.now() });

    if (this.totalSize > this.MAX_CACHE_SIZE) {
      this.cleanupCache();
    }
  }

  private cleanupCache() {
    const sortedEntries = Array.from(this.cache.entries())
      .sort((a, b) => a[1].timestamp - b[1].timestamp);

    while (this.totalSize > this.MAX_CACHE_SIZE && sortedEntries.length > 0) {
      const [oldestUrl, oldestEntry] = sortedEntries.shift()!;
      this.cache.delete(oldestUrl);
      this.totalSize -= oldestEntry.imgBlobUrl.length; // Aproximación del tamaño
    }
  }
}
