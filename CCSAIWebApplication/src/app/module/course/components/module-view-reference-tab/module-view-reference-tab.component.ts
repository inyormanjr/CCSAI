import { ExerciseMainViewComponent } from './../../exercise/exercise-main-view/exercise-main-view.component';
import { UpdateDiscussionModalComponent } from './../../discussion/update-discussion-modal/update-discussion-modal.component';
import { CourseState } from './../../reducer/course.reducer';
import { AddDiscussionModalComponent } from './../../discussion/add-discussion-modal/add-discussion-modal.component';
import { Discussion } from './../../../../shared/models/Discussion';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CourseActionTypes } from '../../action/course.action.types';
import { CourseSelectorTypes } from '../../selector/course.selectors.types';

@Component({
  selector: 'app-module-view-reference-tab',
  templateUrl: './module-view-reference-tab.component.html',
  styleUrls: ['./module-view-reference-tab.component.css']
})
export class ModuleViewReferenceTabComponent implements OnInit {


  discussionList: Discussion[] = [];
  discussionList$: Observable<Discussion[]> | undefined;
  moduleId : any;

  constructor(private modalService: NgbModal,
    private route: ActivatedRoute,
    private courseStore: Store<CourseState>) {
        this.moduleId = this.route.snapshot.paramMap.get('id');
     }

  ngOnInit(): void {
      this.courseStore.dispatch(CourseActionTypes.loadDiscussionsByModuleId({_id : this.moduleId}));
      this.discussionList$ = this.courseStore.select(CourseSelectorTypes.selectDiscussions);
      this.discussionList$.subscribe(res=>{
        this.discussionList = res;
     
      });
  }

  addDiscussion() {
    const modalRef = this.modalService.open(AddDiscussionModalComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.moduleId = this.moduleId;
  }

  updateDiscussion(discussion : any){
    const modalRef = this.modalService.open(UpdateDiscussionModalComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.discussion = discussion;
  }

  openExercises(discussion : any){
    const modalRef = this.modalService.open(ExerciseMainViewComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.discussion = discussion;
  }

}
