
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
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


  users$: Observable<UserModel[]> | undefined;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  currentUser: any = {};
  userList: UserModel[] = [];

  constructor(private userService: UsersService,
    private alertify: AlertifyjsService,
    private tokenStorage: TokenStorageService,
    private userStore: Store<UserState>) {

    if (this.tokenStorage.getDecodedUserToken() !== null) {
      this.currentUser = this.tokenStorage.getDecodedUserToken()
    } else {
      this.currentUser = {};
    }

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      retrieve: true
    };

    this.userStore.dispatch(UserActionTypes.loadUser());
    this.users$ = this.userStore.select(UserSelectorType.selectUserList);

    this.users$.subscribe(res => {
      this.userList = res;
      this.dtTrigger.next();
    });

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  deactivate(user: any) {
    // this.alertify.confirm('User Deactivation','Deactivate selected user?',()=>{
    //   this.userService.deactivateUser(user).subscribe(res=>{
    //     if(res.success){
    //       this.alertify.success('User deactivated.');

    //     }
    //   }, error => {

    //     this.alertify.error(error.error.error);
    //   });
    // });
  }

  activate(user: any) {
    
    this.alertify.confirm('User Activation', 'Activate selected user?', () => {
      this.userStore.dispatch(UserActionTypes.activateUser({user}));
      
    });
  }

}
