import { Course } from './../../../shared/models/Course';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { CourseService } from 'src/app/core/http/course.service';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { CourseActionTypes } from '../action/course.action.types';
import { CourseState } from '../reducer/course.reducer';
import { CourseSelectorTypes } from '../selector/course.selectors.types';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {

  @Input() courseId: any;

  courseForm = this.formBuilder.group({
    courseCode: ['', Validators.required],
    course: ['', Validators.required]
  });

  constructor(public activeModal: NgbActiveModal,
    private courseService: CourseService,
    private alertifyService: AlertifyjsService,
    private formBuilder: FormBuilder,
    private courseStore: Store<CourseState>) {
     }

  ngOnInit(): void {
    this.courseStore.dispatch(CourseActionTypes.getCourseById({_id : this.courseId}));
    this.courseStore.select(CourseSelectorTypes.selectCourse).subscribe(res=>{
      this.initializeValues(res);
    });
  }

  get fc() {
    return this.courseForm.controls;
  }

  initializeValues(course: any) {

    this.courseForm.controls['courseCode'].setValue(course.courseCode);
    this.courseForm.controls['course'].setValue(course.course);
  }

  updateCourse() {
    var course = this.courseForm.value as Course;
    if (this.courseForm.status !== "INVALID") {
      this.courseStore.dispatch(CourseActionTypes.updateCourse({course , id : this.courseId}));
      this.courseStore.select(CourseSelectorTypes.selectCourse).subscribe(res=>{
        this.initializeValues(res);
      });
      // this.courseService.updateCourseById(this.courseId,course).subscribe(
      //   res => {
      //     if (res.success) {
      //       this.alertifyService.success("Course updated");
      //       this.activeModal.close('success');
      //     }
      //   },
      //   error => {
      //     this.alertifyService.error(error.error.error);
      //   }
      // );
    } else {
      this.alertifyService.error("Please fill up all required information.");
    }
  }

}
