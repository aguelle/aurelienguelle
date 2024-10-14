import { TestBed } from '@angular/core/testing';

import { RealisationsService } from './realisations.service';

describe('RealisationsService', () => {
  let service: RealisationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealisationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
