import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IAlbum } from 'src/app/components/albums/albums-item/albums-item.component';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  public subjectStore = new Subject<IAlbum>();
  constructor() { }

  private setInitialStore(albums: IAlbum[]): void {
    localStorage.setItem('favorites', JSON.stringify(albums));
    this.subjectStore.next();
  }

  getAlbumsStore(): IAlbum[] {
    const favorites = localStorage.getItem('favorites');

    if (!favorites) {
      this.setInitialStore([]);
      return [];
    }

    const albums: IAlbum[] = JSON.parse(favorites);
    return albums;
  }

  addAlbumToStore(album: IAlbum): void {
    const albums = this.getAlbumsStore();

    albums.unshift(album);
    this.setInitialStore(albums);
  }

  public deleteAlbum(currentAlbum: IAlbum): void {
    const albums = this.getAlbumsStore();
    const idx = albums.findIndex(album => album.mbid === currentAlbum.mbid);
    if (idx !== -1) {
      albums.splice(idx, 1);
    }

    this.setInitialStore(albums);
  }

  public updateFavorite(currentAlbum: IAlbum): void {
    const albums = this.getAlbumsStore();
    const idx = albums.findIndex(album => album.mbid === currentAlbum.mbid);
    if (idx !== -1) {
      albums[idx].isFavorite = !albums[idx].isFavorite;
    }

    this.setInitialStore([]);
  }
}
