import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from "@angular/common/http";
import { MainComponent } from './pages/main/main.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { FilmsComponent } from './pages/films/films.component';
import { StarshipsComponent } from './pages/starships/starships.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { PlanetsComponent } from './pages/planets/planets.component';
import { CardsComponent } from './pages/characters/components/cards/cards.component';
import { metaReducers, reducers  } from "./store/root.reducer";
import { AppEffects  } from "./store/effects/app.effects";
import { CharacterComponent } from './pages/characters/pages/character/character.component';
import { FormsModule, ReactiveFormsModule  } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CharactersComponent,
    LoginComponent,
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    FilmsComponent,
    StarshipsComponent,
    VehiclesComponent,
    PlanetsComponent,
    CardsComponent,
    CharacterComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        StoreModule.forRoot(reducers, {metaReducers}),
        StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
        EffectsModule.forRoot([AppEffects]),
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
