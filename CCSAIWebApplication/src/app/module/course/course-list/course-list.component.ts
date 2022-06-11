import { UpdateCourseComponent } from './../update-course/update-course.component';
import { NewCourseComponent } from './../new-course/new-course.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Course } from 'src/app/shared/models/Course';
import { CourseState } from '../reducer/course.reducer';
import { Store } from '@ngrx/store';
import { CourseActionTypes } from '../action/course.action.types';
import { CourseSelectorTypes } from '../selector/course.selectors.types';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit, OnDestroy {

  limit: number = 10;
  courses: Course[] = [];
  courses$: Observable<Course[]> | undefined;
  temp: Course[] = [];
  currentUser: any = {};

  constructor(private alertify: AlertifyjsService,
    private tokenStorage: TokenStorageService,
    private modalService: NgbModal,
    private courseStore: Store<CourseState>) {
    if (this.tokenStorage.getDecodedUserToken() !== null) {
      this.currentUser = this.tokenStorage.getDecodedUserToken()
    } else {
      this.currentUser = {};
    }

    this.courseStore.dispatch(CourseActionTypes.loadCourses());
    this.courses$ = this.courseStore.select(CourseSelectorTypes.selectCourses);
    this.courses$.subscribe(res => {
      this.courses = res;
      this.temp = res;
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  updateFilter(event: any) {

    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return (d.course.toLowerCase().indexOf(val) !== -1 || d.courseCode.toLowerCase().indexOf(val) !== -1) || !val;
    });
    this.courses = temp;
  }



  newCourse() {

    const modalRef = this.modalService.open(NewCourseComponent, { size: 'lg', centered: true });
    // modalRef.result.then((result) => {
    //   if (result === 'success') {

    //   }
    // });
  }

  updateCourse(courseId: string) {
    
     const modalRef = this.modalService.open(UpdateCourseComponent, { size: 'lg', centered: true });
     modalRef.componentInstance.courseId = courseId;
    // modalRef.result.then((result) => {
    //   if (result === 'success') {
    //     this.getCourses();
    //   }
    // }, (reason) => {
    // });
  }

  deactivate(course: any) {
    this.alertify.confirm('Course Deactivation', 'Deactivate selected course?', () => {
      this.courseStore.dispatch(CourseActionTypes.deactivateCourse({ course }));
    });
  }

  activate(course: any) {
    this.alertify.confirm('Course Deactivation', 'Deactivate selected course?', () => {
      this.courseStore.dispatch(CourseActionTypes.activateCourse({ course }));
    });
  }



}
