import { LastFmService } from 'src/app/shared/services/last-fm.service';
import { IGenre } from '../genre-list/genre-list.component';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-genre-item',
  templateUrl: './genre-item.component.html',
  styleUrls: ['./genre-item.component.scss']
})
export class GenreItemComponent implements OnInit {
  @Input() genre!: IGenre;

  constructor() { }

  ngOnInit(): void {

  }

}
