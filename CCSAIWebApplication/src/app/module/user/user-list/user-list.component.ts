
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { UserModel } from 'src/app/shared/models/UserModel';
import { UserActionTypes } from '../action/user.action.types';
import { UserState } from '../reducer/user.reducer';
import { Store } from '@ngrx/store';
import { UserSelectorType } from '../selector/user.selectors.types';
import { UsersService } from 'src/app/core/http/user/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  limit : number = 10;
  users$: Observable<UserModel[]> | undefined;
  currentUser: any = {};
  userList: UserModel[] = [];
  temp : UserModel[] = [];

  
  totalSize:number = 0;
  pageSize:number = 0;
  currentPage:number = 0; // 1 based paging for ng-bootstrap

  constructor(private alertify: AlertifyjsService,
    private tokenStorage: TokenStorageService,
    private userStore: Store<UserState>) {

    if (this.tokenStorage.getDecodedUserToken() !== null) {
      this.currentUser = this.tokenStorage.getDecodedUserToken()
    } else {
      this.currentUser = {};
    }

    this.userStore.dispatch(UserActionTypes.loadUser());
    this.users$ = this.userStore.select(UserSelectorType.selectUserList);
    this.users$.subscribe(res => {
      this.userList = res;  
      this.temp = res;
    });

  }

  ngOnInit(): void {  

  }

  ngOnDestroy(): void {
   
  }

  updateFilter(event : any) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return (d.firstName.toLowerCase().indexOf(val) !== -1 || d.lastName.toLowerCase().indexOf(val) !== -1 ) || !val;
    });
    this.userList = temp;
  }
 
  


  deactivate(user: any) {
    this.alertify.confirm('User Activation', 'Activate selected user?', () => {
      this.userStore.dispatch(UserActionTypes.deactivateUser({ user }));
    });
  }

  activate(user: any) {

    this.alertify.confirm('User Activation', 'Activate selected user?', () => {
      this.userStore.dispatch(UserActionTypes.activateUser({ user }));
    });
  }

}
