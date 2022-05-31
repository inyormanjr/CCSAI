import { UsersService } from './../../../core/http/users.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { UserModel } from 'src/app/shared/models/UserModel';
import { UserActionTypes } from '../action/user.action.types';
import { UserState } from '../reducer/user.reducer';
import { Store } from '@ngrx/store';
import { UserSelectorType } from '../selector/user.selectors.types';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit,OnDestroy {


  users$ : Observable<UserModel[]> | undefined;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>(); 
  currentUser : any = {};

  constructor(private userService : UsersService,
    private alertify : AlertifyjsService,
    private tokenStorage: TokenStorageService,
    private userStore : Store<UserState>) {

      if(this.tokenStorage.getDecodedUserToken() !== null){
        this.currentUser = this.tokenStorage.getDecodedUserToken()
      }else{
        this.currentUser = {};
      }

      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        processing: true,
        retrieve : true
      };
      
      this.userStore.dispatch(UserActionTypes.loadUser());
      this.users$ = this.userStore.select(UserSelectorType.selectUserList);

      this.users$.subscribe(()=>{
        this.dtTrigger.next();
      });
      
     }

  ngOnInit(): void {

  }

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();  
  }


  deactivate(user : any){
    this.alertify.confirm('User Deactivation','Deactivate selected user?',()=>{
      this.userService.deactivateUser(user).subscribe(res=>{
        if(res.success){
          this.alertify.success('User deactivated.');
        
        }
      }, error => {
       
        this.alertify.error(error.error.error);
      });
    });
  }

  activate(user : any ){
      this.alertify.confirm('User Activation','Activate selected user?',()=>{
        this.userService.activateUser(user).subscribe(res=>{
          if(res.success){
            this.alertify.success('User activated');
          }
        }, error => {
         
          this.alertify.error(error.error.error);
        });
      });
  }

}
