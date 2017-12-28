import { TestBed, inject } from '@angular/core/testing';

import { QuestionListResolverService } from './question-list-resolver.service';

describe('QuestionListResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionListResolverService]
    });
  });

  it('should be created', inject([QuestionListResolverService], (service: QuestionListResolverService) => {
    expect(service).toBeTruthy();
  }));
});
