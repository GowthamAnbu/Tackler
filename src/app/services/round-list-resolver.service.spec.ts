import { TestBed, inject } from '@angular/core/testing';

import { RoundListResolverService } from './round-list-resolver.service';

describe('RoundListResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoundListResolverService]
    });
  });

  it('should be created', inject([RoundListResolverService], (service: RoundListResolverService) => {
    expect(service).toBeTruthy();
  }));
});
