import { TestBed } from '@angular/core/testing';

import { HistorylineService } from './historyline.service';

describe('HistorylineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HistorylineService = TestBed.get(HistorylineService);
    expect(service).toBeTruthy();
  });
});
