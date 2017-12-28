import { TestBed, inject } from '@angular/core/testing';

import { RoundsService } from './rounds.service';

describe('RoundsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoundsService]
    });
  });

  it('should be created', inject([RoundsService], (service: RoundsService) => {
    expect(service).toBeTruthy();
  }));
});
