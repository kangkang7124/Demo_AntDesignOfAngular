import { TestBed } from '@angular/core/testing';
import { SimManufacturerService } from './simManufacturer.service';

describe('SimManufacturerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SimManufacturerService = TestBed.get(SimManufacturerService);
    expect(service).toBeTruthy();
  });
});
