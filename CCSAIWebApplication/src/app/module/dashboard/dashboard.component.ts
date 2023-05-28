import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  currentUser : any = {};

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if(this.tokenStorage.getDecodedUserToken() !== null){
      this.currentUser = this.tokenStorage.getDecodedUserToken()
    }else{
      this.currentUser = {};
    }
  }

  tryFunction() {
    alert('hello');
  }

}
