import {Component, Input, OnInit} from '@angular/core';
import {CharacterService} from "../../../../services/character.service";
import {ICharacter} from "../../../../interfaces/character";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
  @Input() characters$: Observable<ICharacter[]> = of([])

  getCharacterId(character: ICharacter) {
    const id  = character.url.match(/\d/g)?.join('');
    return id
  }
}
