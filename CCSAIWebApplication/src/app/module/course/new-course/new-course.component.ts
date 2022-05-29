import { CourseService } from './../../../core/http/course.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { FormBuilder, Validators } from '@angular/forms';


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
    private courseService: CourseService,
    private alertifyService: AlertifyjsService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  get fc() {
    return this.courseForm.controls;
  }

  addNewCourse(){
    var course = this.courseForm.value;
    if (this.courseForm.status !== "INVALID") {
      this.courseService.createCourse(course).subscribe(
        res => {
          if (res.success) {
            this.alertifyService.success("Course added.");
            this.activeModal.close('success');
          }
        },
        error => {
          this.alertifyService.error(error.error.error);
        }
      );
    } else {
      this.alertifyService.error("Please fill up all required information.");
    }
  }

}
