import { UsersService } from './../../../core/http/users.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit,OnDestroy {


  users : Array<any> = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>(); 
  currentUser : any = {};

  constructor(private userService : UsersService,
    private alertify : AlertifyjsService,
    private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {


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
    this.getUsers();
  }

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();  
  }

  getUsers(){
   
      this.userService.getUsers().subscribe(res=>{ 
        this.users = res.data;    
        this.dtTrigger.next();
      });
  }

  deactivate(user : any){
    this.alertify.confirm('User Deactivation','Deactivate selected user?',()=>{
      this.userService.deactivateUser(user).subscribe(res=>{
        if(res.success){
          this.alertify.success('User deactivated.');
          this.getUsers();
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
            this.getUsers();
          }
        }, error => {
         
          this.alertify.error(error.error.error);
        });
      });
  }

}
