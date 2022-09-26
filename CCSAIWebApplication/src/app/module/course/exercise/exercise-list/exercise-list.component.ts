import { UpdateSelectedExerciseComponent } from './../update-selected-exercise/update-selected-exercise.component';
import { ExerciseService } from './../../../../core/http/exercise/exercise.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from 'src/app/shared/models/Exercise';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseState } from '../../reducer/course.reducer';
import { Store } from '@ngrx/store';
import { CourseActionTypes } from '../../action/course.action.types';
import { CourseSelectorTypes } from '../../selector/course.selectors.types';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {

  exerciseList: Exercise[] = [];
  exerciseList$: Observable<Exercise[]> | undefined;
  moduleId: any = this.route.snapshot.paramMap.get('id');

  constructor(private alertifyService: AlertifyjsService,
    private tokenStorage: TokenStorageService,
    private modalService: NgbModal,
    private courseStore: Store<CourseState>,
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,) {
    this.courseStore.dispatch(CourseActionTypes.loadExercisesByModuleId({ _id: this.moduleId }));
    this.exerciseList$ = this.courseStore.select(CourseSelectorTypes.selectExercises);
    this.exerciseList$.subscribe(res => {
      this.exerciseList = res;

    });
  }

  ngOnInit(): void {

  }

  activate(exercise: any) {
    this.alertifyService.confirm('Exercise Activation', 'Activate selected exercise?', () => {
      this.exerciseService.activateExercise(exercise).subscribe(res => {
        if (res.success) {
          this.alertifyService.success("Exercise Activated");
          this.courseStore.dispatch(CourseActionTypes.loadExercisesByModuleId({ _id: this.moduleId }));
        }
      })
    });
  }

  deactivate(exercise: any) {
    this.alertifyService.confirm('Exercise Deactivation', 'Deactivate selected exercise?', () => {
      this.exerciseService.deactivateExercise(exercise).subscribe(res => {
        if (res.success) {
          this.alertifyService.error("Exercise deactivated");
          this.courseStore.dispatch(CourseActionTypes.loadExercisesByModuleId({ _id: this.moduleId }));

        }
      })
    });
  }

  updateExercise(exercise : any){
    const modalRef = this.modalService.open(UpdateSelectedExerciseComponent, { size: 'lg', centered: true, windowClass: "no-pointer-events" });
    modalRef.componentInstance.exercise = exercise;
    modalRef.componentInstance.moduleId = this.moduleId;
  }


}
