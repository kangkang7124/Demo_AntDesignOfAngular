import { TestBed } from '@angular/core/testing';
import { IccidService } from './iccid.service';

describe('IccidService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IccidService = TestBed.get(IccidService);
    expect(service).toBeTruthy();
  });
});
