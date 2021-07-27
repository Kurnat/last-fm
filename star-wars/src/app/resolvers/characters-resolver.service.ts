import {Injectable} from "@angular/core";
import {catchError, filter, switchMap, take, tap} from "rxjs/operators";
import {ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot} from "@angular/router";
import {Store} from "@ngrx/store";
import {Observable, of} from "rxjs";
import {charactersSelector} from "../store/characters/selectors";
import {loadCharactersAction} from "../store/characters/actions";
import {ICharacter} from "../interfaces/character";

@Injectable({
  providedIn: 'root',
})
export class CharactersResolverService implements Resolve<ICharacter[]>, CanActivate {

  constructor(private store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): ICharacter[] | Observable<ICharacter[]> | Promise<ICharacter[]> {
    return this.getFromStoreOrAPI()
  }

  canActivate(): Observable<boolean> {
    return this.getFromStoreOrAPI().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private getFromStoreOrAPI(): Observable<ICharacter[]> {
    return this.store.select(charactersSelector).pipe(
      tap((characters) => {
        if (!characters.length) {
          this.store.dispatch(loadCharactersAction({ search: '' }));
        }
      }),
      filter((characters) => !!characters.length),
      take(1)
    );
  }
}
