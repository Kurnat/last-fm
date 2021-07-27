import {ActionReducerMap, MetaReducer} from "@ngrx/store";
import { environment } from "src/environments/environment";
import {charactersReducer, ICharactersState} from "./characters";

export interface State {
  characters: ICharactersState
}

export const reducers: ActionReducerMap<State> = {
  characters: charactersReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
