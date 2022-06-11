import { CourseState } from './../reducer/course.reducer';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Course } from 'src/app/shared/models/Course';
import { Store } from '@ngrx/store';
import { CourseActionTypes } from '../action/course.action.types';
import { CourseSelectorTypes } from '../selector/course.selectors.types';


@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css']
})
export class NewCourseComponent implements OnInit {


  courseForm = this.formBuilder.group({
    courseCode: ['', Validators.required],
    course: ['', Validators.required]
  });

  constructor(public activeModal: NgbActiveModal,
    private alertifyService: AlertifyjsService,
    private formBuilder: FormBuilder,
    private courseStore : Store<CourseState>) { }

  ngOnInit(): void {
  }

  get fc() {
    return this.courseForm.controls;
  }

  addNewCourse(){
    var course = this.courseForm.value as Course;
    if (this.courseForm.status !== "INVALID") {
      // this.courseService.createCourse(course).subscribe(
      //   res => {
      //     if (res.success) {
      //       this.alertifyService.success("Course added.");
      //       this.activeModal.close('success');
      //     }
      //   },
      //   error => {
      //     this.alertifyService.error(error.error.error);
      //   }
      // );
      this.courseStore.dispatch(CourseActionTypes.createCourse({data : course}));
      this.courseStore.select(CourseSelectorTypes.selectCourse).subscribe(res=>{
        if(res._id.length > 0){    
            this.courseForm.reset();
        }     
      });
    } else {
      this.alertifyService.error("Please fill up all required information.");
    }
  }

}
