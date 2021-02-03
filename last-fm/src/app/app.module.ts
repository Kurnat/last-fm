import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenreItemComponent } from './pages/genre/_components/genre-item/genre-item.component';
import { HomeComponent } from './pages/home/home.component';
import { GenreListComponent } from './pages/genre/_components/genre-list/genre-list.component';
import { GenreComponent } from './pages/genre/genre.component';
import { AlbumsListComponent } from './components/albums/albums-list/albums-list.component';
import { AlbumsItemComponent } from './components/albums/albums-item/albums-item.component';

// Material
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SearchComponent } from './pages/genre/_components/search/search.component';
import { AlbumFilterPipe } from './shared/pipes/album-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GenreItemComponent,
    HomeComponent,
    GenreListComponent,
    GenreComponent,
    AlbumsListComponent,
    AlbumsItemComponent,
    SearchComponent,
    AlbumFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
