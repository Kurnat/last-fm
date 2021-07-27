import { TestBed } from '@angular/core/testing';

import { CharacterService } from './character.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CharacterService', () => {
  let service: CharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule ]
    });
    service = TestBed.inject(CharacterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
