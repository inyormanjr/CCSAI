import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCoursesCardComponent } from './dashboard-courses-card.component';

describe('DashboardCoursesCardComponent', () => {
  let component: DashboardCoursesCardComponent;
  let fixture: ComponentFixture<DashboardCoursesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCoursesCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCoursesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
