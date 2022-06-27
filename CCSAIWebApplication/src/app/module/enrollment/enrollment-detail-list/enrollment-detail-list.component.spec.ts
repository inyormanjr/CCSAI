import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentDetailListComponent } from './enrollment-detail-list.component';

describe('EnrollmentDetailListComponent', () => {
  let component: EnrollmentDetailListComponent;
  let fixture: ComponentFixture<EnrollmentDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollmentDetailListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
