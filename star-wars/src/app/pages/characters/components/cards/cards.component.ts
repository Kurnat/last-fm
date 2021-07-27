import {Component, Input, OnInit} from '@angular/core';
import {CharacterService} from "../../../../services/character.service";
import {ICharacter} from "../../../../interfaces/character";
import {Observable, of} from "rxjs";
import {charactersSelector} from "../../../../store/characters/selectors";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent  {

  public characters$: Observable<ICharacter[]> = this.store.select(charactersSelector)

  constructor(private store: Store) {
  }
  getCharacterId(character: ICharacter) {
    const id  = character.url.match(/\d/g)?.join('');
    return id
  }
}
