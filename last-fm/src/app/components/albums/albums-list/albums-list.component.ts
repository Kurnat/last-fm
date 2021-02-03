import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LastFmService } from 'src/app/shared/services/last-fm.service';
import { map, switchMap } from 'rxjs/operators';
import { IAlbum } from '../albums-item/albums-item.component';
import { StoreService } from 'src/app/shared/services/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss']
})
export class AlbumsListComponent implements OnInit, OnDestroy {
  albums: IAlbum[] = [];
  private $albumsSub!: Subscription;
  @Input() search = '';

  constructor(private router: ActivatedRoute,
              private lastFmService: LastFmService,
              private storeService: StoreService,
              ) { }

  ngOnInit(): void {
    this.getAllAlbums();
  }

  ngOnDestroy(): void {
    if (this.$albumsSub) {
      this.$albumsSub.unsubscribe();
    }
  }

  getAllAlbums(): void {
    this.$albumsSub = this.router.params
      .pipe(
         switchMap(params => this.lastFmService.getTopAlbums(params.genre)),
         map(res => res.albums.album),
         map(albums => albums.map((album) => {
          const favorites = this.storeService.getAlbumsStore();

          // Set albums to favorites or not
          const isFavorite = favorites.some(it => (it.artist.mbid === album.artist.mbid && album.name === it.name));
          isFavorite ? album.isFavorite = true : album.isFavorite = false;

          return album;
          })
        )
      )
      .subscribe(allAlbums => {
        this.albums = allAlbums;
      });
  }
}
