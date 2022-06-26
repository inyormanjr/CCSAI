import { Discussion } from './../../../../shared/models/Discussion';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { CourseState } from '../../reducer/course.reducer';
import { Store } from '@ngrx/store';
import { CourseActionTypes } from '../../action/course.action.types';

@Component({
  selector: 'app-add-discussion-modal',
  templateUrl: './add-discussion-modal.component.html',
  styleUrls: ['./add-discussion-modal.component.css']
})
export class AddDiscussionModalComponent implements OnInit {

  @Input() moduleId : any;

  discussionForm = this.formBuilder.group({
    discussion: ['', Validators.required],
    moduleId : ['',Validators.required],
    title : ['',Validators.required]});


  constructor(public activeModal: NgbActiveModal,
    private alertifyService: AlertifyjsService,
    private formBuilder: FormBuilder,
    private courseStore : Store<CourseState>
    ) { }

  ngOnInit(): void {
    this.discussionForm.controls.moduleId.setValue(this.moduleId);
  }

  get fc() {
    return this.discussionForm.controls;
  }

  addNewDiscussion(){
    var discussion = this.discussionForm.value as Discussion;
    if (this.discussionForm.status !== "INVALID") {
      this.courseStore.dispatch(CourseActionTypes.createDiscussion({ data: discussion }));
      this.discussionForm.reset({moduleId : this.moduleId});
    } else {
      this.alertifyService.error("Please fill up all required information.");
    }
  }

}
