import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseMainViewComponent } from './exercise-main-view.component';

describe('ExerciseMainViewComponent', () => {
  let component: ExerciseMainViewComponent;
  let fixture: ComponentFixture<ExerciseMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciseMainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
