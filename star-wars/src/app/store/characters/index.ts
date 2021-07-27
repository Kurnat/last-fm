import { createReducer, on} from "@ngrx/store";
import {ICharacter} from "../../interfaces/character";
import {loadCharactersAction, successCharactersAction} from "./actions";

export interface ICharactersState {
  isLoading: boolean;

  search: string;
  characters: ICharacter[];
}

const initialState: ICharactersState = {
  isLoading: false,

  search: '',
  characters: [],
};

export const charactersReducer = createReducer(
  initialState,
  on(loadCharactersAction, (state, { search }) => ({
    ...state,
    isLoading: true,
    search,
  })),
  on(successCharactersAction, (state, { characters, isLoading }) => ({
    ...state,
    isLoading,
    characters,
  }))
);



