import { TestBed } from '@angular/core/testing';

import { GetModuleByIdResolver } from './get-module-by-id.resolver';

describe('GetModuleByIdResolver', () => {
  let resolver: GetModuleByIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GetModuleByIdResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
