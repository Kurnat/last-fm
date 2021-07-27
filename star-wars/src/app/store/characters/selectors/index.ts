import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ICharactersState} from "../index";

export const featureCharactersSelector =
  createFeatureSelector<ICharactersState>('characters');

export const charactersSelector = createSelector(
  featureCharactersSelector,
  (state) => state.characters
);

export const isLoadingSelector = createSelector(
  featureCharactersSelector,
  (state) => state.isLoading
);

export const getCharacterByIdSelector = (id: string) =>
  createSelector(featureCharactersSelector, (state: ICharactersState) =>
    state.characters.find((it) => it.url.match(/\d/g)?.join('') === id)
  );

export const searchSelector = createSelector(
  featureCharactersSelector,
  (state: ICharactersState) => state.search
);
