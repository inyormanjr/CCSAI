import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCoursesContainerComponent } from './dashboard-courses-container.component';

describe('DashboardCoursesContainerComponent', () => {
  let component: DashboardCoursesContainerComponent;
  let fixture: ComponentFixture<DashboardCoursesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCoursesContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCoursesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
