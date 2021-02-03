import { Component, OnInit } from '@angular/core';

export interface IGenre {
  title: string;
  backgroundColor: string;
  img: string;
}

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss']
})
export class GenreListComponent implements OnInit {
  public genres: IGenre[] = [
    {title: 'rock', backgroundColor: '#9bf1e1', img: '../../../../../assets/img/rock.jfif'},
    {title: 'electro', backgroundColor: '#ec1e32', img: '../../../../../assets/img/electro.jfif'},
    {title: 'hip-hop', backgroundColor: '#f59c23', img: '../../../../../assets/img/timberlake.jfif'},
    {title: 'pop', backgroundColor: '#c3f0c8', img: '../../../../../assets/img/pop.jpg'},
    {title: 'R&B', backgroundColor: '#f138a5', img: '../../../../../assets/img/r&b.jfif'},
    {title: 'indie', backgroundColor: '#4100f5', img: '../../../../../assets/img/indie.png'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
