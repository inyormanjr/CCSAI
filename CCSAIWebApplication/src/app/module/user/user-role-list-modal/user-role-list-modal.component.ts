import { EnrollmentState } from './../../enrollment/reducer/enrollment.reducer';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/shared/models/UserModel';
import { UserActionTypes } from '../action/user.action.types';
import { UserState } from '../reducer/user.reducer';
import { UserSelectorType } from '../selector/user.selectors.types';
import { EnrollmentActionTypes } from '../../enrollment/action/enrollment.action.types';
import { EnrollmentSelectorTypes } from '../../enrollment/selector/enrollment.selector.types';

@Component({
  selector: 'app-user-role-list-modal',
  templateUrl: './user-role-list-modal.component.html',
  styleUrls: ['./user-role-list-modal.component.css']
})
export class UserRoleListModalComponent implements OnInit {
  @Input() roleFilter: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  limit : number = 10;
  users$: Observable<UserModel[]> | undefined;
  currentUser: any = {};
  userList: UserModel[] = [];
  temp : UserModel[] = [];
  role = "";

  constructor(private enrollmentStore: Store<EnrollmentState>,
    public activeModal: NgbActiveModal,) { 

  }

  ngOnInit(): void {
    if(this.roleFilter === 'instructor'){
      this.role = 'Instructor'
    }else{
      this.role = 'Student'
    }
    this.enrollmentStore.dispatch(EnrollmentActionTypes.loadUser({role : this.roleFilter}));
    this.users$ = this.enrollmentStore.select(EnrollmentSelectorTypes.selectUserList);
    this.users$.subscribe(res => {
      this.userList = res;  
      this.temp = res;
    });
  }

  updateFilter(event : any) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return (d.firstName.toLowerCase().indexOf(val) !== -1 || d.lastName.toLowerCase().indexOf(val) !== -1 ) || !val;
    });
    this.userList = temp;
  }

  select(user : UserModel){
    
    const userCopy = {...user};
    userCopy.fullName = userCopy.fullName.toUpperCase();
      this.passEntry.emit(userCopy);
      this.activeModal.close('success');
  }
 

}
