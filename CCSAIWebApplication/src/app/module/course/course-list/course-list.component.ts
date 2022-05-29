import { UpdateCourseComponent } from './../update-course/update-course.component';
import { NewCourseComponent } from './../new-course/new-course.component';
import { CourseService } from './../../../core/http/course.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit, OnDestroy {


  courses: Array<any> = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  currentUser: any = {};

  constructor(private courseService: CourseService,
    private alertify: AlertifyjsService,
    private tokenStorage: TokenStorageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.tokenStorage.getDecodedUserToken() !== null) {
      this.currentUser = this.tokenStorage.getDecodedUserToken()
    } else {
      this.currentUser = {};
    }


    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      retrieve: true,
      columns: [
        { "width": "15%" },
        { "width": "60%" },
        { "width": "15%" },
        { "width": "10%" }
      ]
    };

    this.getCourses();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getCourses() {

    this.courseService.getCourses().subscribe(res => {
      this.courses = res.data;
      this.dtTrigger.next();
    });
  }

  newCourse() {

    const modalRef = this.modalService.open(NewCourseComponent, { size: 'lg', centered: true });
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.getCourses();
      }
    }, (reason) => {
    });
  }

  updateCourse(courseId : String) {
    const modalRef = this.modalService.open(UpdateCourseComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.courseId = courseId;
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.getCourses();
      }
    }, (reason) => {
    });
  }

  deactivate(course : any){
    this.alertify.confirm('Course Deactivation','Deactivate selected course?',()=>{
      this.courseService.deactivateCourse(course).subscribe(res=>{
        if(res.success){
          this.alertify.success('Course deactivated.');
          this.getCourses();
        }
      }, error => {
       
        this.alertify.error(error.error.error);
      });
    });
  }

  activate(course : any ){
      this.alertify.confirm('Course Activation','Activate selected course?',()=>{
        this.courseService.activateCourse(course).subscribe(res=>{
          if(res.success){
            this.alertify.success('Course activated');
            this.getCourses();
          }
        }, error => { 
          this.alertify.error(error.error.error);
        });
      });
  }

  

}
