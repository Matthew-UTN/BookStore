import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { AuthService} from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService) { }
public email: string='';
public pass: string='';
  ngOnInit() {
  }

  onLogin(): void{
    this.authService.loginEmailUser(this.email,this.pass)
      .then((res)=>{
        this.onLoginRedirect();
      }).catch(err=>this.elGranError(err));
  }

  onLoginGoogle(): void{
    this.authService.loginGoogleUser()
      .then ((res)=>{
        console.log('resUser',res);
        this.onLoginRedirect();
      }).catch(err=>this.elGranError(err));
  } 

  onLoginFacebook(): void{
    this.authService.loginFacebookUser()
    .then ((res)=>{
      console.log('resUser',res);
      this.onLoginRedirect();
    }).catch(err=>this.elGranError(err));
  }

  onLogout(){
    this.afAuth.auth.signOut();
  }

  onLoginRedirect(): void{
    this.router.navigate(['admin/list-books']);
  }

  elGranError(err: string): void{
    console.log("err",err);
  }
}
