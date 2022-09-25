import { UpdateAssessmentComponent } from './../update-assessment/update-assessment.component';
import { AssessmentService } from './../../../../core/http/assessment/assessment.service';
import { AddAssessmentComponent } from './../add-assessment/add-assessment.component';
import { AssessmentListDTO } from 'src/app/shared/models/Assessment';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseState } from '../../reducer/course.reducer';
import { Store, props } from '@ngrx/store';
import { CourseActionTypes } from '../../action/course.action.types';
import { ActivatedRoute } from '@angular/router';
import { CourseSelectorTypes } from '../../selector/course.selectors.types';

@Component({
  selector: 'app-assessment-list',
  templateUrl: './assessment-list.component.html',
  styleUrls: ['./assessment-list.component.css']
})
export class AssessmentListComponent implements OnInit {


  limit: number = 10;
  assessmentList: AssessmentListDTO[] = [];
  assessmentList$: Observable<AssessmentListDTO[]> | undefined;
  temp: AssessmentListDTO[] = [];
  currentUser: any = {};
  moduleId: any = this.route.snapshot.paramMap.get('id');

  constructor(private alertify: AlertifyjsService,
    private tokenStorage: TokenStorageService,
    private modalService: NgbModal,
    private courseStore: Store<CourseState>,
    private route: ActivatedRoute,
    private assessmentService: AssessmentService) {

  }

  ngOnInit(): void {
    if (this.tokenStorage.getDecodedUserToken() !== null) {
      this.currentUser = this.tokenStorage.getDecodedUserToken()
    } else {
      this.currentUser = {};
    }


    if (this.moduleId) {
      this.courseStore.dispatch(CourseActionTypes.loadAssessmentByModuleId({ _id: this.moduleId }));
      this.assessmentList$ = this.courseStore.select(CourseSelectorTypes.selectAssessments);
      this.assessmentList$.subscribe(res => {
        this.assessmentList = res;
        this.temp = res;

      });
    }

  }

  updateFilter(event: any) {

    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.assessmentName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.assessmentList = temp;
  }

  newAssessment() {

    const modalRef = this.modalService.open(AddAssessmentComponent, { size: 'lg', centered: true, windowClass: "no-pointer-events" });
    modalRef.componentInstance.moduleId = this.moduleId;
  }

  viewAssessment(assessmentId: any) {
    
    const modalRef = this.modalService.open(UpdateAssessmentComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.id = assessmentId;
  }

  deactivate(assessment: any) {
    this.alertify.confirm('Assessment Deactivation', 'Deactivate selected assessment?', () => {
      this.assessmentService.deactivateAssessment(assessment).subscribe(res => {
        if (res.success) {
          this.courseStore.dispatch(CourseActionTypes.loadAssessmentByModuleId({ _id: this.moduleId }));
          this.alertify.error("Assessment deactivated.");
        }
      })
    });
  }

  activate(assessment: any) {
    this.alertify.confirm('Assessment Activation', 'Activate selected assessment?', () => {
      this.assessmentService.activateAssessment(assessment).subscribe(res => {
        if (res.success) {
          this.courseStore.dispatch(CourseActionTypes.loadAssessmentByModuleId({ _id: this.moduleId }));
          this.alertify.success("Assessment activated.");
        }
      })
    });
  }

}
