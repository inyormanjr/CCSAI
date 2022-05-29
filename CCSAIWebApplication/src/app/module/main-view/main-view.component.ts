import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {


  currentUser : any = {};

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if(this.tokenStorage.getDecodedUserToken() !== null){
      this.currentUser = this.tokenStorage.getDecodedUserToken()
    }else{
      this.currentUser = {};
    }
  }

}
