import { FormBuilder, Validators } from '@angular/forms';
import { Discussion } from './../../../../shared/models/Discussion';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { Store } from '@ngrx/store';
import { CourseState } from '../../reducer/course.reducer';
import { CourseActionTypes } from '../../action/course.action.types';

@Component({
  selector: 'app-update-discussion-modal',
  templateUrl: './update-discussion-modal.component.html',
  styleUrls: ['./update-discussion-modal.component.css']
})
export class UpdateDiscussionModalComponent implements OnInit {


  @Input() discussion : any;

  discussionForm = this.formBuilder.group({
    _id : ['',Validators.required],
    discussion: ['', Validators.required],
    moduleId : ['',Validators.required],
    title : ['',Validators.required]});

  constructor(public activeModal: NgbActiveModal,
    private alertifyService: AlertifyjsService,
    private formBuilder: FormBuilder,
    private courseStore : Store<CourseState>) { }

  ngOnInit(): void {
    this.discussionForm.controls._id.setValue(this.discussion._id);
    this.discussionForm.controls.discussion.setValue(this.discussion.discussion);
    this.discussionForm.controls.title.setValue(this.discussion.title);
    this.discussionForm.controls.moduleId.setValue(this.discussion.moduleId._id);
  }

  updateDiscussion(){
    var discussion = this.discussionForm.value as Discussion;
    if (this.discussionForm.status !== "INVALID") {
      this.courseStore.dispatch(CourseActionTypes.updateDiscussion({ discussion: discussion, id : discussion._id }));
  
    } else {
      this.alertifyService.error("Please fill up all required information.");
    }
  }

}
