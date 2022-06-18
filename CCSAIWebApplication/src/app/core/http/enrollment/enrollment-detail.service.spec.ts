import { TestBed } from '@angular/core/testing';

import { EnrollmentDetailService } from './enrollment-detail.service';

describe('EnrollmentDetailService', () => {
  let service: EnrollmentDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnrollmentDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
