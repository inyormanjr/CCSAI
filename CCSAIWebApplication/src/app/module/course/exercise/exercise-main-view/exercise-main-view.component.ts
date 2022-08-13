import { ExerciseService } from './../../../../core/http/exercise/exercise.service';
import { AlertifyjsService } from './../../../../core/services/alertifyjs.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { Exercise } from 'src/app/shared/models/Exercise';

@Component({
  selector: 'app-exercise-main-view',
  templateUrl: './exercise-main-view.component.html',
  styleUrls: ['./exercise-main-view.component.css']
})
export class ExerciseMainViewComponent implements OnInit {


  @Input() discussion: any;

  exerciseList: Exercise[] = [];
  trans = "NEW";

  exerciseForm = this.formBuilder.group({
    _id: [null],
    discussionId: [null, Validators.required],
    exerciseDetails: [null, Validators.required]
  });

  constructor(public activeModal: NgbActiveModal,
    private alertifyService: AlertifyjsService,
    private formBuilder: FormBuilder,
    private exerciseService: ExerciseService) { }

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
              this.exerciseForm.reset({discussionId : this.discussion._id});
            }
          })
        }
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
    this.trans = "UPDATE";
  }

  loadExercises() {
    this.exerciseService.getExerciseByDiscussionId(this.discussion._id).subscribe(res => {
      console.log(res);
      if (res.count > 0) {

        this.exerciseList = res.data;
      }
    });
  }



}
