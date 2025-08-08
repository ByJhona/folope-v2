import { TestBed } from '@angular/core/testing';

import { ApiFolope } from './api-folope';

describe('ApiFolope', () => {
  let service: ApiFolope;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFolope);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
