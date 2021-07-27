import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ICharacter} from "../../interfaces/character";
import {CharacterService} from "../../services/character.service";
import {Observable, of, Subject, Subscription} from "rxjs";
import {charactersSelector, isLoadingSelector, searchSelector} from "../../store/characters/selectors";
import {Store} from "@ngrx/store";
import {debounceTime, distinctUntilChanged, startWith} from "rxjs/operators";
import {ActivatedRoute, Data} from "@angular/router";
import {loadCharactersAction, setCharactersAction} from "../../store/characters/actions";

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit, AfterViewInit, OnDestroy {
  public isLoading$: Observable<boolean> = this.store.select(isLoadingSelector);

  public searchText = '';

  private keyUpSubject = new Subject<string>();

  private keyUpSubjectSub?: Subscription;
  private searchSelectorSub?: Subscription;
  private charactersSub?: Subscription;

  @ViewChild('inputRef') inputRef?: ElementRef<HTMLInputElement>;


  constructor(private characterService: CharacterService, private store: Store, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.listenOnKeyUp();

    this.charactersSub = this.activatedRoute.data.subscribe(
      ({ data }: Data) => this.store.dispatch(setCharactersAction({characters: data, isLoading: false}))
    );

    this.searchSelectorSub = this.store
      .select(searchSelector)
      .subscribe((search) => (this.searchText = search));

    this.store.dispatch(loadCharactersAction({ search: this.searchText}));
  }

  ngAfterViewInit() {
    this.inputRef?.nativeElement.focus();
  }

  ngOnDestroy(): void {
    this.searchSelectorSub?.unsubscribe();
    this.keyUpSubjectSub?.unsubscribe();
    this.keyUpSubjectSub?.unsubscribe();
    this.charactersSub?.unsubscribe();
  }

  onKeyUp(event: KeyboardEvent) {
    const { value } = event.target as HTMLInputElement;
    this.keyUpSubject.next(value);
  }

  listenOnKeyUp() {
    this.keyUpSubjectSub = this.keyUpSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((search) => this.store.dispatch(loadCharactersAction({ search })))
  }
}
