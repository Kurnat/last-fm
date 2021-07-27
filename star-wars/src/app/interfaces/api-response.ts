import {ICharacter} from "./character";
import {IStarShip} from "./star-ship";
import {IFilms} from "./film";
import {IVehicle} from "./vehicle";

export interface IResponse {
  count: number;
  next: string | null;
  previous: string | null;
}

export interface IResponseCharacters extends IResponse {
  results: ICharacter[];
}

export interface IResponseStarShip extends IResponse {
  results: IStarShip[];
}

export interface IResponseFilms extends IResponse {
  results: IFilms[];
}

export interface IResponseVehicle extends IResponse {
  results: IVehicle[];
}
