import { UserLogin } from './../../shared/models/UserLogin';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/http/authentication.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { AlertifyjsService } from './../../core/services/alertifyjs.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private alertify: AlertifyjsService,
    private tokenStorage: TokenStorageService,
    private router : Router) { }

  ngOnInit(): void {
    this.tokenStorage.signOut();
  }

  get fc() {
    return this.loginForm.controls;
  }

  
  onSubmit() {
    let user = this.loginForm.value as UserLogin;

    if(!this.loginForm.invalid){
      this.login(user);
    }else{
      this.alertify.error('Please complete form.');
    }
    
  }

  login(user : UserLogin){
    this.authenticationService.loginUser(user).subscribe(
      res => {
        if(res.success){
          this.tokenStorage.saveUser(res.token);
          this.router.navigate(['/mainview/dashboard']);
        }
      },
      error=>{
        console.log(error)
        this.tokenStorage.signOut();
        this.alertify.error(error.message);
      });
  }

}
