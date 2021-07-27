import { Injectable } from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, tap} from "rxjs/operators";
import {loadCharactersAction, successCharactersAction} from "../characters/actions";
import {EMPTY} from "rxjs";
import {CharacterService} from "../../services/character.service";

@Injectable()
export class AppEffects {

  constructor(
    private actions$: Actions,
    private characterService: CharacterService
  ) {}

  getCharacters$ = createEffect(() => this.actions$.pipe(
    ofType(loadCharactersAction),
    mergeMap(({search = ''}) => this.characterService.getCharacters(search).pipe(
      tap(data => console.log('data', data)),
      map(({results}) => successCharactersAction({characters: results, isLoading: false})),
      catchError(() => EMPTY)
    )),
  ))
}
