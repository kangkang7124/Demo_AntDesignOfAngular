import { TestBed } from '@angular/core/testing';

import { InitService } from './init-service.service';

describe('InitServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InitService = TestBed.get(InitService);
    expect(service).toBeTruthy();
  });
});
