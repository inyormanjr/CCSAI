import { data } from 'jquery';
import { AssessmentListDTOService } from './../../../../core/http/assessment/assessment-list-dto.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AssessmentService } from 'src/app/core/http/assessment/assessment.service';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { CourseState } from '../../reducer/course.reducer';
import { group } from 'console';
import { Assessment } from 'src/app/shared/models/Assessment';
import { CourseActionTypes } from '../../action/course.action.types';

@Component({
  selector: 'app-update-assessment',
  templateUrl: './update-assessment.component.html',
  styleUrls: ['./update-assessment.component.css']
})
export class UpdateAssessmentComponent implements OnInit {


  @Input() id: any;
  
  assessment:any;
  assessmentForm: FormGroup;
  constructor(public activeModalUpdate: NgbActiveModal,
    private alertifyService: AlertifyjsService,
    private formBuilder: FormBuilder,
    private courseStore: Store<CourseState>,
    private assessmentService : AssessmentService,
    private assessmentDTOService : AssessmentListDTOService) { 
      this.assessmentForm = this.formBuilder.group({
        _id : [null,Validators.required],
        assessmentName: [null, Validators.required],
        moduleId: [null, Validators.required],
        assessmentGroup: this.formBuilder.array([])
      });

    }

  ngOnInit(): void {
    
    this.assessmentDTOService.getAssessmentById(this.id).subscribe(res=>{
      this.assessment = res.data[0];
      this.fillData(this.assessment);
    });

  
  }

  assessmentGroup(): FormArray {
    return this.assessmentForm.get('assessmentGroup') as FormArray;
  }

  newAssessmentGroup(assessmentGroup : any): FormGroup {

 
    return this.formBuilder.group({
      _id : [assessmentGroup._id],
      groupName: [assessmentGroup.groupName, Validators.required],
      questions: this.formBuilder.array([])
    });
   
  }

  addAssessmentGroup(ag : any) {
    this.assessmentGroup().push(this.newAssessmentGroup(ag));
  }



  newQuestion(question : any): FormGroup {
    return this.formBuilder.group({
      _id : [question._id],
      points: [question.points, Validators.required],
      questionDetail: [question.questionDetail, Validators.required],
      instructions: [question.instructions, Validators.required]
    })
  }

  addQuestion(question: any,index : any) {
    console.log(index);
    this.questions(index).push(this.newQuestion(question));
  }


  questions(assessmentGroupIndex: number): FormArray {
    return this.assessmentGroup().at(assessmentGroupIndex).get('questions') as FormArray;
  }

  updateAssessment(){
    var assessment = this.assessmentForm.value as Assessment;
    if (this.assessmentForm.status !== "INVALID") {
        this.alertifyService.confirm("Update Assessment","Save assessment?",()=>{
          this.assessmentService.Update(assessment._id,assessment).subscribe(res=>{
            if(res.success){
              this.courseStore.dispatch(CourseActionTypes.loadAssessmentByModuleId({ _id: assessment.moduleId }));
              this.activeModalUpdate.close();
            }
          });
        })
    } else {
      this.alertifyService.error("Please fill up all required information.");
    }
  }

  fillData(assessment : any){
  
    var gCount=0;
    this.assessmentForm.controls._id.setValue(assessment._id);
    this.assessmentForm.controls.assessmentName.setValue(assessment.assessmentName);
    this.assessmentForm.controls.moduleId.setValue(assessment.moduleId);
   
    assessment.assessmentgroups.forEach( (x : any) => {
      this.addAssessmentGroup(x);
      
      assessment.assessmentgroups[gCount].assessmentquestions.forEach((question : any) => {
        this.addQuestion(question,gCount);
      });

      gCount++;
    });
  }

}
