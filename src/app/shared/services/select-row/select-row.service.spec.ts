import { TestBed } from '@angular/core/testing';

import { SelectRowService } from './select-row.service';

describe('SelectRowService', () => {
  let service: SelectRowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectRowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
