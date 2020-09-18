import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ToastController , LoadingController, AlertController } from '@ionic/angular';
import { resolve } from 'url';
import { AccessProviders} from '../../providers/access-providers';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { tap, map, filter, retry, catchError } from 'rxjs/operators';
import { HTTP } from '@ionic-native/http/ngx';
import { ProvidersService } from '../../providers.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { CrudService } from '../crud/crud.service';
import { HomePage } from '../home/home.page';
import { Injectable } from '@angular/core';
import { CurrUserService } from '../../services/curr-user.service';




@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  your_name: string = "";
  gender: string = "";
  age: string = "";
  height: string = "";
  weight: string = "";
  target: string = "";
  level: string = "";
  tProg: string = "";
  lastWorkout: string = "";
  lastWorkoutDate:string = "";
  creationDate: string = new Date().toDateString();
  lastSeen: string = new Date().toDateString();
  
 disabledButon;

 userId: any;

  constructor(
    private home: HomePage,
    private router: Router,
    public currUserService: CurrUserService,
    private toastCtrl:ToastController,
    private loadingCtrl:LoadingController,
    private alertCtrl:AlertController,
    private accessProvider: AccessProviders,
    private http: HttpClient,
    private providerService: ProvidersService,
    private auth: AngularFireAuth,
    private crud: CrudService
  ) { }

  ngOnInit() {

    if (this.router.getCurrentNavigation().extras){
      this.userId = this.router.getCurrentNavigation().extras.state.userId;
      console.log(this.userId);
      this.setUserId(this.userId);
     }

  }

  setUserId(id){
    this.userId = id;
  }

  calculate_bmi(height, weight){
    return Math.floor(weight/((height/100)*(height/100)));
  }


  get_training_program(){
    let _numericLevel, _bmi = 0;

    if (this.level == 'Beginner') {_numericLevel = 100}
    else if (this.level == 'Intermediate') {_numericLevel = 200}
    else if (this.level == 'Profesional') {_numericLevel = 300}

    _bmi = this.calculate_bmi(this.height, this.weight)

    let data = {
      target: this.target,
      gender: this.gender,
      weight: Number(this.weight),
      height: Number(this.height),
      numericLevel: _numericLevel,
      bmi: _bmi,
      request: 'tProg'
    }

    this.http.post('http://localhost:8080/knn', {data}).map(res => res).subscribe(data => {
      this.tryRegister(data[0]);
      });

  }
  
  
  
  tryRegister(t_prog){
    let userData = {
      your_name: this.your_name,
      gender:  this.gender,
      age: this.age,
      height: this.height,
      weight:  this.weight,
      target:  this.target,
      level:  this.level,
      lastSeen: this.lastSeen,
      creationDate:  this.creationDate,
      trainProg:  t_prog,
      menu: "",
      lastWorkout: "",
      lastWorkoutName: "",
      lastWorkoutDate: "",
      nextWorkout: "",
      nextWorkoutName: "",
      progress:{
        current_progress: "",
        total_workouts: ""
      }

    }
    

    this.http.post(`https://fitgodb.firebaseio.com/users/${this.userId}.json`, userData)
    .subscribe(data => {
      let navigationExtras: NavigationExtras = {
        state:{
          userId: this.userId
        }
      }
        this.currUserService.fetchUsers(this.userId);
        this.router.navigate(['home'], navigationExtras);
      },
      err => console.log(err)
     );

     
  }

  ionViewDidEnter(){
    this.disabledButon = false;
  }
/*

this.http.post('https://fitgodb.firebaseio.com/users.json',{user})
    .subscribe(data => {
        console.log(data);
      },
      err => console.log(err)
     )


  async tryRegister(){
    if(this.your_name == "") {this.presentToast('Your name is required')}
    else if (this.gender == "") {this.presentToast('Your gender is required')}
    else if (this.age == "") {this.presentToast('Your birthYear is required')}
    else if (this.email_adress == "") {this.presentToast('Your email is required')}
    else if (this.password == "") {this.presentToast('Your password is required')}
    else if (this.confirm_pass == "") {this.presentToast('passwords are not the same')}
    else if (this.height == "") {this.presentToast('Your height is required')}
    else if (this.weight == "") {this.presentToast('Your weight is required')}
    else if (this.target == "") {this.presentToast('Your target is required')}
    else if (this.level == "") {this.presentToast('Your level is required')}
    else {
      this.disabledButon = true 
      const loader = await this.loadingCtrl.create({
        message: 'pleas wait....'
      });
      
         
         this.http.post('http://fitgodb.firebaseio.com/users.json', {...body})
            .subscribe(tap(resData => 
              {
                loader.dismiss();
                console.log(resData);}
              ));

      });
      
    }
  

  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

  async presentAlertConfirm(a) {
    const alert = await this.alertCtrl.create({
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Close',
          
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Try again',
          handler: () => {
            this.tryRegister();
          }
        }
      ]
    });

    await alert.present();
  }
 */ 

}
