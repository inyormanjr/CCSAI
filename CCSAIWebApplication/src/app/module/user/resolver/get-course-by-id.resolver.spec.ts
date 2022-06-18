import { TestBed } from '@angular/core/testing';

import { GetCourseByIdResolver } from './get-course-by-id.resolver';

describe('GetCourseByIdResolver', () => {
  let resolver: GetCourseByIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GetCourseByIdResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
