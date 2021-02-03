import { ElementRef, EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  numberOfFavorites = 0;
  hidden = false;
  @Output() search: EventEmitter<string> = new EventEmitter();

  constructor(
    private router: Router,
    private storeService: StoreService) { }

  ngOnInit(): void {
    this.getNumberOfFavorites();
    this.getFavorites();
  }

  getNumberOfFavorites(): void {
    this.numberOfFavorites = this.storeService.getAlbumsStore().length;
  }

  navigate(): void {
    this.router.navigate(['/']);
  }

  toggleBadgeVisibility(): void {
    this.hidden = !this.hidden;
  }

  getFavorites(): void {
    this.storeService.subjectStore.subscribe(() => {
      this.getNumberOfFavorites();
    });
  }

  searchAlbum(event: Event): void {
    const node = event.target as HTMLInputElement;

    this.search.emit(node.value);
  }

}
