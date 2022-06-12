import { TestBed } from '@angular/core/testing';

import { UpdateEnrollmentResolver } from './update-enrollment.resolver';

describe('UpdateEnrollmentResolver', () => {
  let resolver: UpdateEnrollmentResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UpdateEnrollmentResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
