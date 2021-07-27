import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {CharactersComponent} from "./pages/characters/characters.component";
import {LoginComponent} from "./pages/login/login.component";
import {AdminComponent} from "./pages/admin/admin.component";
import {FilmsComponent} from "./pages/films/films.component";
import {PlanetsComponent} from "./pages/planets/planets.component";
import {StarshipsComponent} from "./pages/starships/starships.component";
import {VehiclesComponent} from "./pages/vehicles/vehicles.component";
import {CharacterComponent} from "./pages/characters/pages/character/character.component";

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'characters', component: CharactersComponent},
  {path: 'characters/:id', component: CharacterComponent},
  {path: 'films', component: FilmsComponent},
  {path: 'planets', component: PlanetsComponent},
  {path: 'starships', component: StarshipsComponent},
  {path: 'vehicles', component: VehiclesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
