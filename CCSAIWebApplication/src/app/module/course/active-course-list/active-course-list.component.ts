import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from 'src/app/shared/models/Course';
import { Enrollment } from 'src/app/shared/models/Enrollment';
import { EnrollmentActionTypes } from '../../enrollment/action/enrollment.action.types';
import { EnrollmentState } from '../../enrollment/reducer/enrollment.reducer';
import { EnrollmentSelectorTypes } from '../../enrollment/selector/enrollment.selector.types';

@Component({
  selector: 'app-active-course-list',
  templateUrl: './active-course-list.component.html',
  styleUrls: ['./active-course-list.component.css']
})
export class ActiveCourseListComponent implements OnInit {

  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  limit: number = 10;
  courses: Course[] = [];
  courses$: Observable<Course[]> | undefined;
  temp: Course[] = [];
 

  constructor(public activeModal: NgbActiveModal,
    private enrollmentStore: Store<EnrollmentState>) { 
    this.enrollmentStore.dispatch(EnrollmentActionTypes.loadActiveCourses());
    this.courses$ = this.enrollmentStore.select(EnrollmentSelectorTypes.selectActiveCourses);
    this.courses$.subscribe(res => {
      this.courses = res;
      this.temp = res;
    });
  }

  ngOnInit(): void {
  }

  updateFilter(event: any) {

    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return (d.course.toLowerCase().indexOf(val) !== -1 || d.courseCode.toLowerCase().indexOf(val) !== -1) || !val;
    });
    this.courses = temp;
  }

  select(course : Course){
    
    const courseCopy = {...course};
    courseCopy.course = courseCopy.course.toUpperCase();
    courseCopy.courseCode = courseCopy.courseCode.toUpperCase();
      this.passEntry.emit(courseCopy);
      this.activeModal.close('success');
  }
 

}
