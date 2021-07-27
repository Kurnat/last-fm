import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IResponseCharacters, IResponseFilms, IResponseStarShip, IResponseVehicle} from "../interfaces/api-response";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private baseUrl = 'https://swapi.dev'

  constructor(private http: HttpClient) { }

  getCharacters(search = ''){
    return this.http.get<IResponseCharacters>(`${this.baseUrl}/api/people?search=${search}`)
  }

  getFilms(){
    return this.http.get(`${this.baseUrl}/api/films`)
  }

  getFilmByUrl(url: string) {
    return this.http.get<IResponseFilms>(url)
  }

  getVehicleByUrl(url: string) {
    return this.http.get<IResponseVehicle>(url)
  }

  getStarshipByUrl(url: string) {
    return this.http.get<IResponseStarShip>(url)
  }

  // getSpecieByUrl(url: string) {
  //   return this.http.get<>(url)
  // }

  // getPlanets(){
  //   return this.http.get<IResponse>('/api/planets')
  // }
}
