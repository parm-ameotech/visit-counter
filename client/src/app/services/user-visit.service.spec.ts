import { TestBed, inject } from '@angular/core/testing';

import { UserVisitService } from './user-visit.service';

describe('UserVisitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserVisitService]
    });
  });

  it('should be created', inject([UserVisitService], (service: UserVisitService) => {
    expect(service).toBeTruthy();
  }));
});
