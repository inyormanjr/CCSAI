import { AssessmentService } from './../../../../core/http/assessment/assessment.service';
import { Assessment } from './../../../../shared/models/Assessment';
import { CourseState } from './../../reducer/course.reducer';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { Store } from '@ngrx/store';
import { throws } from 'assert';
import { CourseActionTypes } from '../../action/course.action.types';

@Component({
  selector: 'app-add-assessment',
  templateUrl: './add-assessment.component.html',
  styleUrls: ['./add-assessment.component.css']
})
export class AddAssessmentComponent implements OnInit {


  @Input() moduleId: any;

  assessmentForm: FormGroup;
  constructor(public activeModalAdd: NgbActiveModal,
    private alertifyService: AlertifyjsService,
    private formBuilder: FormBuilder,
    private courseStore: Store<CourseState>,
    private assessmentService : AssessmentService) {
    this.assessmentForm = this.formBuilder.group({
      assessmentName: [null, Validators.required],
      moduleId: [null, Validators.required],
      assessmentGroup: this.formBuilder.array([])
    });

  }

  ngOnInit(): void {

    this.assessmentForm.controls.moduleId.setValue(this.moduleId);
  }

  assessmentGroup(): FormArray {
    return this.assessmentForm.get('assessmentGroup') as FormArray;
  }

  newAssessmentGroup(): FormGroup {
    return this.formBuilder.group({
      groupName: [null, Validators.required],
      questions: this.formBuilder.array([])
    })
  }
  removeAssessmentGroup(index: number) {
    this.assessmentGroup().removeAt(index);
  }

  addAssessmentGroup() {
    this.assessmentGroup().push(this.newAssessmentGroup());
  }

  questions(assessmentGroupIndex: number): FormArray {
    return this.assessmentGroup().at(assessmentGroupIndex).get('questions') as FormArray;
  }

  newQuestion(): FormGroup {
    return this.formBuilder.group({
      points: ['0.00', Validators.required],
      questionDetail: [null, Validators.required],
      instructions: [null, Validators.required]
    })
  }

  addQuestion(assessmentGroupIndex: number) {
    this.questions(assessmentGroupIndex).push(this.newQuestion());
  }

  removeQuestion(assessmentGroupIndex: number, questionIndex: number) {
    this.questions(assessmentGroupIndex).removeAt(questionIndex);
  }

  get fc() {
    return this.assessmentForm.controls;
  }

  addNewAssessment() {

    
    var assessment = this.assessmentForm.value as Assessment;
    if (this.assessmentForm.status !== "INVALID") {
        this.alertifyService.confirm("Add Assessment","Save assessment?",()=>{
          this.assessmentService.Create(assessment).subscribe(res=>{
            if(res.success){
              this.courseStore.dispatch(CourseActionTypes.loadAssessmentByModuleId({ _id: this.moduleId }));
              this.assessmentForm.reset({moduleId : this.moduleId});
              this.activeModalAdd.close();
            }
          });
        })
    } else {
      this.alertifyService.error("Please fill up all required information.");
    }
  }

}
