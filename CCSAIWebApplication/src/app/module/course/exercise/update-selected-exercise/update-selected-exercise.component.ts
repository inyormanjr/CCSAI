import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ExerciseService } from 'src/app/core/http/exercise/exercise.service';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { Exercise } from 'src/app/shared/models/Exercise';
import { CourseActionTypes } from '../../action/course.action.types';
import { CourseState } from '../../reducer/course.reducer';

@Component({
  selector: 'app-update-selected-exercise',
  templateUrl: './update-selected-exercise.component.html',
  styleUrls: ['./update-selected-exercise.component.css']
})
export class UpdateSelectedExerciseComponent implements OnInit {


  @Input() exercise: any;
  @Input() moduleId: any;


  exerciseForm = this.formBuilder.group({
    _id: [null],
    discussionId: [null, Validators.required],
    exerciseDetails: [null, Validators.required],
    exerciseName: [null, Validators.required],
    instructions: [null, Validators.required],
    points: [0, Validators.required]
  });

  constructor(public activeModal: NgbActiveModal,
    private alertifyService: AlertifyjsService,
    private formBuilder: FormBuilder,
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private courseStore: Store<CourseState>,) { }

  ngOnInit(): void {
    this.exerciseForm.controls._id.setValue(this.exercise._id);
    this.exerciseForm.controls.discussionId.setValue(this.exercise.discussionId);
    this.exerciseForm.controls.exerciseDetails.setValue(this.exercise.exerciseDetails);
    this.exerciseForm.controls.exerciseName.setValue(this.exercise.exerciseName);
    this.exerciseForm.controls.instructions.setValue(this.exercise.instructions);
    this.exerciseForm.controls.points.setValue(this.exercise.points);
  }

  get fc() {
    return this.exerciseForm.controls;
  }

  save() {
    var exercise = this.exerciseForm.value as Exercise;
    if (this.exerciseForm.status !== "INVALID") {

      this.exerciseService.Update(this.fc._id.value, exercise).subscribe(res => {
        if (res.success) {
          this.alertifyService.success("Exercise successfully updated.");
          this.courseStore.dispatch(CourseActionTypes.loadExercisesByModuleId({ _id: this.moduleId }));
        }
      });
    }
    else {
      this.alertifyService.error("Please fill up all required information.");
    }
  }

}
