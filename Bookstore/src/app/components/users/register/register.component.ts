import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService} from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/observable'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private storage: AngularFireStorage) { }

  @ViewChild('imageUser',{static: true}) inputImageUser: ElementRef;
  public email: string='';
  public password: string =  '';

  
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  ngOnInit() {
  }

  onUpload(e){
    const id = Math.random().toString(36).substring(2);//give random id
    const file = e.target.files[0];//
    const filePath = `upload/profile_${id}`;//makes the file path
    const ref = this.storage.ref(filePath);//takes the reference of the filepath
    const task = this.storage.upload(filePath,file);//uploads the file and its path
    this.uploadPercent = task.percentageChanges();//for the loading bar
    task.snapshotChanges().pipe(finalize(()=> this.urlImage= ref.getDownloadURL())).subscribe();//finds teh image url and writes it to URLimage
  }

  onAddUser(){
    this.authService.registerUser(this.email,this.password)
      .then((res)=>{
        this.authService.isAuth().subscribe(user=>{
          if(user){
            user.updateProfile({
              displayName: '',
              photoURL: this.inputImageUser.nativeElement.value
            }).then(()=>{
              this.router.navigate(['admin/list-books']);
            }).catch((error)=>{
              console.log('error',error);
            })
          }
        })       
      }).catch(err=>console.log("err",err.message));
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

  onLoginRedirect(): void{
    this.router.navigate(['admin/list-books']);
  }

  elGranError(err: string): void{
    console.log("err",err);
  }
}
