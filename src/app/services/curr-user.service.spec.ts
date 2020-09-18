import { TestBed } from '@angular/core/testing';

import { CurrUserService } from './curr-user.service';

describe('CurrUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrUserService = TestBed.get(CurrUserService);
    expect(service).toBeTruthy();
  });
});
