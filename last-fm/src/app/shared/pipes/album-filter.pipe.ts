import { Pipe, PipeTransform } from '@angular/core';
import { IAlbum } from 'src/app/components/albums/albums-item/albums-item.component';

@Pipe({
  name: 'albumFilter'
})
export class AlbumFilterPipe implements PipeTransform {

  transform(value: IAlbum[], filter: string = ''): IAlbum[] {
    return value.filter((it) => {
      if (it.name.toLocaleLowerCase().startsWith(filter.toLocaleLowerCase())) {
        return it;
      } else if (it.artist.name.toLocaleLowerCase().startsWith(filter.toLocaleLowerCase())) {
        return it;
      }

      return false;
    });
  }

}
