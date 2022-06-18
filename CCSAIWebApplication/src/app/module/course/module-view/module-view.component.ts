import { ModuleService } from './../../../core/http/module/module.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { CourseModelModule } from 'src/app/shared/models/CourseModule';

@Component({
  selector: 'app-module-view',
  templateUrl: './module-view.component.html',
  styleUrls: ['./module-view.component.css']
})
export class ModuleViewComponent implements OnInit {

  moduleId = "";
  courseId = "";

  courseForm = this.formBuilder.group({
    courseCode: [''],
    course: ['']
  });

  moduleForm = this.formBuilder.group({
    _id : [null,Validators.nullValidator],
    courseId : ['',Validators.nullValidator],
    module : ['',Validators.nullValidator]
  });

  constructor(private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertifyService: AlertifyjsService,
    private router : Router,
    private moduleService : ModuleService) { 
    this.activatedRoute.data.subscribe(data => {
      this.moduleId = data.routeResolver.data._id;
      this.initializeValues(data.routeResolver.data);
    });
  }

  initializeValues(module: any) {
    this.courseForm.controls['courseCode'].setValue(module.courseId.courseCode.toUpperCase());
    this.courseForm.controls['course'].setValue(module.courseId.course);

    this.moduleForm.controls['courseId'].setValue(module.courseId._id);
    this.moduleForm.controls['_id'].setValue(module._id);
    this.moduleForm.controls['module'].setValue(module.module);

    this.moduleId = module._id;
    this.courseId = module.courseId._id;
  }

  ngOnInit(): void {
  }

  updateModule(){
    var module = this.moduleForm.value as CourseModelModule;

    if (this.moduleForm.status !== "INVALID") {

      this.alertifyService.confirm("Module Update", "Update module?", () => {
        this.moduleService.Update(this.moduleId,module).subscribe(res => {
          this.alertifyService.success("Successfully Saved.");
        },
          error => {
            this.alertifyService.error(error.error.error);
          })
      })
    } else {
      this.alertifyService.error("Please fill up all required information.");
    }
  }

  back(){
    this.router.navigate(['./mainview/course/modulelist',this.courseId]);
  }

}
