import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAlbum } from 'src/app/components/albums/albums-item/albums-item.component';

interface IResponse {
  albums: {
    album: IAlbum[]
  };
}

@Injectable({
  providedIn: 'root'
})
export class LastFmService {
  constructor(private http: HttpClient) { }

  public getTopAlbums(genre: string): Observable<IResponse> {
    return this.http.get<IResponse>(`http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=${genre}&api_key=22e5dcb7293a23da484afeacce80c247&format=json`);
  }
}
