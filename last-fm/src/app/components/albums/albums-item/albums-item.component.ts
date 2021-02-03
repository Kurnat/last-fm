import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreService } from 'src/app/shared/services/store.service';

interface IImage {
  '#text': string;
    size: string;
}

interface IArtist {
  name: string;
  mbid: string;
  url: string;
}

export interface IAlbum {
  '@attr': {rank: string};
  artist: IArtist;
  image: IImage[];
  mbid: string;
  name: string;
  url: string;
  isFavorite?: boolean;
}

@Component({
  selector: 'app-albums-item',
  templateUrl: './albums-item.component.html',
  styleUrls: ['./albums-item.component.scss']
})
export class AlbumsItemComponent {
  @Input() album!: IAlbum;

  constructor(private storeService: StoreService,
              private snackBar: MatSnackBar) { }

  makeFavorite(album: IAlbum): void {
    album.isFavorite = !album.isFavorite;

    if (album.isFavorite) {
      this.openSnackBar(album.name, 'Like!');
      return this.storeService.addAlbumToStore(album);
    }

    this.openSnackBar(album.name, 'Unlike!');
    this.storeService.deleteAlbum(album);
  }

  openSnackBar(album: string, action: string): void {
    this.snackBar.open(album, action, {
      duration: 500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
