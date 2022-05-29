import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseService } from 'src/app/core/http/course.service';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';

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
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getByCourseId();
  }

  get fc() {
    return this.courseForm.controls;
  }

  getByCourseId() {

    this.courseService.getCourseById(this.courseId).subscribe(res => {
      if (res.success) {
        this.initializeValues(res.data);
      }
    },
      error => {
        this.alertifyService.error(error.error.error);
      });
  }

  initializeValues(course: any) {

    this.courseForm.controls['courseCode'].setValue(course.courseCode);
    this.courseForm.controls['course'].setValue(course.course);
  }

  updateCourse() {
    var course = this.courseForm.value;
    if (this.courseForm.status !== "INVALID") {
      this.courseService.updateCourseById(this.courseId,course).subscribe(
        res => {
          if (res.success) {
            this.alertifyService.success("Course updated");
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
