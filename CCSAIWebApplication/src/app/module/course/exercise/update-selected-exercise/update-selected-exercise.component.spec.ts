import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSelectedExerciseComponent } from './update-selected-exercise.component';

describe('UpdateSelectedExerciseComponent', () => {
  let component: UpdateSelectedExerciseComponent;
  let fixture: ComponentFixture<UpdateSelectedExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSelectedExerciseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSelectedExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
