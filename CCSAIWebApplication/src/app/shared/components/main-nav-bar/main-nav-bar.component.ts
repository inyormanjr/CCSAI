import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/http/authentication.service';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-main-nav-bar',
  templateUrl: './main-nav-bar.component.html',
  styleUrls: ['./main-nav-bar.component.css']
})
export class MainNavBarComponent implements OnInit {

  currentUser : any;

  constructor(private authService : AuthenticationService,
    private alertify: AlertifyjsService,
    private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getDecodedUserToken(); 
  }

  logout(){
    this.tokenStorage.signOut();
  
    location.reload();
  }

}
