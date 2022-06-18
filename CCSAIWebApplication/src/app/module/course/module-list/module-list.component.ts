import { ModuleService } from './../../../core/http/module/module.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { Observable } from 'rxjs';
import { CourseModelModule } from 'src/app/shared/models/CourseModule';
import { CourseState } from '../reducer/course.reducer';
import { Store } from '@ngrx/store';
import { CourseActionTypes } from '../action/course.action.types';
import { CourseSelectorTypes } from '../selector/course.selectors.types';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent implements OnInit {


  courseId = "";

  courseForm = this.formBuilder.group({
    courseCode: [''],
    course: ['']
  });

  moduleForm = this.formBuilder.group({
    courseId : ['',Validators.nullValidator],
    module : ['',Validators.nullValidator]
  });

  moduleList : CourseModelModule[] = [];
  limit = 10;
  temp: CourseModelModule[] = [];
  //moduleList$: Observable<CourseModelModule[]> | undefined;

  constructor(
    private alertifyService: AlertifyjsService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private courseStore : Store<CourseState>,
    private moduleService : ModuleService) {
    this.activatedRoute.data.subscribe(data => {
      this.courseId = data.routeResolver.data._id;
      this.initializeValues(data.routeResolver.data);
    });
  }

  ngOnInit(): void {
    this.loadModules();
  }

  loadModules(){
    this.courseStore.dispatch(CourseActionTypes.loadModulesByCourseId({_id : this.courseId}));
    this.courseStore.select(CourseSelectorTypes.selectModules).subscribe(res=>{
      this.moduleList = res;
      this.temp = res;
    });  
  }

  get fc() {
    return this.courseForm.controls;
  }

  initializeValues(course: any) {
    this.courseForm.controls['courseCode'].setValue(course.courseCode.toUpperCase());
    this.courseForm.controls['course'].setValue(course.course);

    this.moduleForm.controls['courseId'].setValue(this.courseId);
  }


  createModule(){
    var module = this.moduleForm.value as CourseModelModule;

    if (this.moduleForm.status !== "INVALID") {

      this.alertifyService.confirm("Module Registration", "Add Module to the selected Course?", () => {
        this.moduleService.Create(module).subscribe(res => {
          this.alertifyService.success("Successfully Saved.");
          this.moduleForm.reset({courseId : this.courseId});
          this.loadModules();
        },
          error => {
            this.alertifyService.error(error.error.error);
          })
      })
    } else {
      this.alertifyService.error("Please fill up all required information.");
    }
  }

  updateFilter(event: any) {

    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.module.toLowerCase().indexOf(val) !== -1  || !val;
    });
    this.moduleList = temp;
  }

}
