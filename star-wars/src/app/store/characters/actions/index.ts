import {createAction, props} from "@ngrx/store";
import {ICharacter} from "../../../interfaces/character";
import {CharactersStatus, CharacterStatus} from "../interfaces";

export const getSingleCharacterAction = createAction(CharacterStatus.Load);
export const successGetSingleCharacterAction = createAction(
  CharacterStatus.Success,
  props<{ character: ICharacter }>()
);

export const loadCharactersAction = createAction(
  CharactersStatus.Load,
  props<{ search: string }>()
);

export const successCharactersAction = createAction(
  CharactersStatus.Success,
  props<{ characters: ICharacter[]; isLoading: boolean }>()
);

export const setCharactersAction = createAction(
  CharactersStatus.Success,
  props<{ characters: ICharacter[]; isLoading: boolean }>()
);


