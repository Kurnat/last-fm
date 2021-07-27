import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {getCharacterByIdSelector} from "../../../../store/characters/selectors";
import {Store} from "@ngrx/store";
import {ICharacter} from "../../../../interfaces/character";

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit, OnDestroy {
  public id: string | null
  public character?: ICharacter

  private characterSub?: Subscription

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store)
  {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnDestroy(): void {
        this.characterSub?.unsubscribe()
    }

  ngOnInit(): void {
    this.getCharacter()
  }

  private getCharacter() {
    if (this.id) {
      this.characterSub = this.store
        .select(getCharacterByIdSelector(this.id))
        .subscribe((data) => this.character = data);
    }
  }

}
