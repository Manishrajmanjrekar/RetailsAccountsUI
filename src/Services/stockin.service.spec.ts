import { TestBed } from '@angular/core/testing';

import { StockinService } from './stockin.service';

describe('StockinService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockinService = TestBed.get(StockinService);
    expect(service).toBeTruthy();
  });
});
