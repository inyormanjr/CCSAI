import { TestBed } from '@angular/core/testing';

import { GetUserByIdResolver } from './get-user-by-id.resolver';

describe('GetUserByIdResolver', () => {
  let resolver: GetUserByIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GetUserByIdResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
