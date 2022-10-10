import { ExerciseService } from './../../../../core/http/exercise/exercise.service';
import { AlertifyjsService } from './../../../../core/services/alertifyjs.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { Exercise } from 'src/app/shared/models/Exercise';
import { ActivatedRoute } from '@angular/router';
import { CourseState } from '../../reducer/course.reducer';
import { Store } from '@ngrx/store';
import { CourseActionTypes } from '../../action/course.action.types';

@Component({
  selector: 'app-exercise-main-view',
  templateUrl: './exercise-main-view.component.html',
  styleUrls: ['./exercise-main-view.component.css']
})
export class ExerciseMainViewComponent implements OnInit {


  @Input() discussion: any;
  @Input() moduleId: any;

  exerciseList: Exercise[] = [];
  trans = "NEW";
  

  exerciseForm = this.formBuilder.group({
    _id: [null],
    discussionId: [null, Validators.required],
    exerciseDetails: [null, Validators.required],
    exerciseName : [null, Validators.required],
    instructions : [null, Validators.required],
    points : [0, Validators.required]
  });

  constructor(public activeModal: NgbActiveModal,
    private alertifyService: AlertifyjsService,
    private formBuilder: FormBuilder,
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private courseStore: Store<CourseState>,) { 
      
    }

  ngOnInit(): void {
    
    this.exerciseForm.controls.discussionId.setValue(this.discussion._id);
    this.loadExercises();
  }

  get fc() {
    return this.exerciseForm.controls;
  }

  save() {
    var exercise = this.exerciseForm.value as Exercise;
    if (this.exerciseForm.status !== "INVALID") {
      if(this.fc._id.value){
          this.exerciseService.Update(this.fc._id.value,exercise).subscribe(res=>{
            if(res.success){
              this.alertifyService.success("Exercise successfully updated.");
              this.loadExercises();
              this.exerciseForm.reset({discussionId : this.discussion._id});
            }
          });
      }else{
       
          this.exerciseService.Create(exercise).subscribe(res=>{
            if(res.success){
              this.alertifyService.success("Exercise successfully added.");
              this.loadExercises();
              this.exerciseForm.reset({discussionId : this.discussion._id, points : 0});
             
            }
          })
        }
        this.courseStore.dispatch(CourseActionTypes.loadExercisesByModuleId({ _id: this.moduleId }));
        
    }
    else {
      this.alertifyService.error("Please fill up all required information.");
    }
  }


  clear() {
    this.exerciseForm.reset({ discussionId: this.discussion._id });
    this.trans = "ADD";
  }

  selectExercise(exercise: any) {

    this.exerciseForm.controls._id.setValue(exercise._id);
    this.exerciseForm.controls.exerciseDetails.setValue(exercise.exerciseDetails);
    this.exerciseForm.controls.instructions.setValue(exercise.instructions);
    this.exerciseForm.controls.exerciseName.setValue(exercise.exerciseName);
    this.exerciseForm.controls.points.setValue(exercise.points);
    this.trans = "UPDATE";
  }

  loadExercises() {
    this.exerciseService.getExerciseByDiscussionId(this.discussion._id).subscribe(res => {

      if (res.count > 0) {

        this.exerciseList = res.data;
      }
    });
  }

  activate(exercise : any){
    this.alertifyService.confirm('Exercise Activation', 'Activate selected exercise?', () => {
      this.exerciseService.activateExercise(exercise).subscribe(res=>{
        if(res.success){
          this.alertifyService.success("Exercise Activated");
          this.loadExercises();
         
        }
      })
    });
  }

  deactivate(exercise : any){
    this.alertifyService.confirm('Exercise Deactivation', 'Deactivate selected exercise?', () => {
      this.exerciseService.deactivateExercise(exercise).subscribe(res=>{
        if(res.success){
          this.alertifyService.error("Exercise deactivated");
          this.loadExercises();
         
        }
      })
    });
  }



}
