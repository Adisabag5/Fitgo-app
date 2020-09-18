import { Component, OnInit } from '@angular/core';
import { AuthService, AuthResponseData } from './auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { RegisterPage } from '../register/register.page';
import { CurrUserService } from '../../services/curr-user.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoding = false;
  isLogin = true;
  userID = null;
  test: any;
  

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public currUserService: CurrUserService,
    private register: RegisterPage,
    private http: HttpClient
  )
    { }

  ngOnInit() {
    
  }


  onSwitchAuthMode(){
    this.isLogin = !this.isLogin;
  }

 


  authenticate(email:string, password:string){
      this.isLoding = true;
     console.log(email,password)
     this.loadingCtrl
      .create({ keyboardClose: true, message: 'Loading in...' })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable <AuthResponseData>;
        if(this.isLogin) {
          authObs = this.authService.login(email, password);
        }else{
          authObs = this.authService.signup(email,password);
          }
        authObs.subscribe(resData => {
          this.userID = resData.localId;

          let navigationExtras: NavigationExtras = {
            state:{
              userId: resData.localId
            }
          }
          this.isLoding = false;
          loadingEl.dismiss();
          if (!this.isLogin){
            console.log(this.authService.userId);
            this.router.navigate(['register'], navigationExtras);
            //send user email&password
          }else{
            console.log(this.userID)
            this.currUserService.updateUserId1(this.userID);
            //send user email&password
            //this.register.getUserEmailAndPassword(email, password);
            this.router.navigate(['home'], navigationExtras);
          }
          },
          errRes => {

            loadingEl.dismiss();
            const code = errRes.error.error.message;
            let message = 'Could not sign up, please try again.'
            if (code === 'EMAIL_EXISTS'){
              message = 'This email adress already exists';
            }else if(code === 'EMAIL_NOT_FOUND'){
              message = 'E-mail adress could not be found';
            }else if(code === 'INVALID_PASSWORD'){
              message = 'This password is not correct';
            }
            this.showAlert(message);
          });
      });
    
  }


  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    console.log(1)

   this.authenticate(email,password);
   console.log(2)

  }

  private showAlert(message:string){
    this.alertCtrl.create({
      header: 'Authentication failed',
      message: message,
      buttons: ['okay']
    })
    .then(alertEl => alertEl.present());
  }
}
