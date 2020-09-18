import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, subscribeOn } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class CurrUserService {

  public userId1: any;
  public userId2: any;

  public userData: any;
  public userProg: any;
  public nextWorkoutName: any;
  public nextWorkout: any;
  public location: {
            latitude: number,
            longitude: number
          };
  public partners = [];

  public bmi;
  public menu;

  constructor(
    private http: HttpClient,
    private router: Router,
    private geolocation: Geolocation
  ) { }
 
  updateUserId1(userId1){
    this.userId1 = userId1;
  }

  fetchUsers(userId1){
    return this.http.get(`https://fitgodb.firebaseio.com/users/${userId1}.json`)
                .pipe(map(resData => {
                  console.log(resData);
                  this.userId2 = Object.keys(resData)[0];
                  this.userData = resData[this.userId2];
                  this.fetchUserProg(this.userData.trainProg).subscribe();
                  this.getGeo();
                 }
                ));
  }
  getGeo(){
     this.geolocation.getCurrentPosition().then((position) => {
      this.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

     }).catch((error) => {
       console.log('Error getting location', error);
     });

  }
  


  fetchUserProg(userProg){
    console.log(userProg)
    let tProg = this.fixTprog(userProg);
    return this.http.get(`https://fitgodb.firebaseio.com/Training-progs/${tProg}.json`)
                .pipe(map(resData => {
                  console.log(resData);
                  this.userProg = resData;
                  this.fetchWorkout(this.userProg).subscribe();
                  this.getPartners(userProg)
                 }
                ));
  }

  fetchWorkout(userProg){
    let nextWorkout = this._nextWorkoutName(userProg);
    return this.http.get(`https://fitgodb.firebaseio.com/Workouts/${nextWorkout}.json`)
    .pipe(map(res => {
      this.nextWorkout = res; 
      this.checkDates(); 
      if (this.userData.menu == ''){
        this.createProgramOrMenu('menu');
      }else{
        this.fetchMenu(this.userData.menu).subscribe();
      }   
    }));
  }

  fetchMenu(menu){
    let _menu = this.fixMenu(menu);
    console.log(_menu)
    return this.http.get(`https://fitgodb.firebaseio.com/Menu/${_menu}.json`)
    .pipe(map(res => {
      console.log(res)
      this.menu = res;
    }));
  }

  createProgramOrMenu(_request: String){
    let data = {
      gender: this.userData.gender, 
      target: this.userData.target, 
      height: Number(this.userData.height), 
      weight: Number(this.userData.weight), 
      bmi: this.calculate_bmi(this.userData.height, this.userData.weight),
      numericLevel: this.getNumericLeve(this.userData.level),
      request: _request
    }

    this.http.post('http://localhost:8080/knn', {data}).map(res => res).subscribe(data => {
      console.log(data[0])
      if(_request == 'menu'){
        this.userData.menu = data[0];
      }else{
        this.userData.trainProg = data[0];
      }
      
      this.updateUserData(this.userData).subscribe();


      });
  }

  getPartners(userProg){
    let data = {
      dist: 10,
      lan: this.location.latitude,
      lon: this.location.longitude,
      tProg: userProg
    }
    this.http.post('http://localhost:8080/partners', {data}).map(res => res).subscribe(data => {
      console.log(data[0])
      
      let counter = 0;
      this.partners = [];
      let tmp = [];
      for(let i = 0; i < data[0].length; i++){
        tmp.push(data[0][i])
        counter ++;
        if(counter == 3){
          this.partners.push(tmp)
          counter = 0;
          tmp = [];
        }
      }
      });

  }

  /* updates */

  afterWorkoutUpdate(){
    this.userData['lastWorkoutDate'] = new Date().toDateString();
    this.userData['lastWorkout'] = this.nextWorkoutName;
    this.userData['progress']['current_progress'] += 1;
    this.userData['progress']['total_workouts'] += 1;

    this.updateUserData(this.userData).subscribe();    
  }

  updateUserData(userData){
    console.log(this.userId1,this.userId2);
    return this.http.put(`https://fitgodb.firebaseio.com/users/${this.userId1}/${this.userId2}.json`, userData)
                .pipe(map(resData => {
                    console.log('user updated');
                    console.log(resData);
                    this.router.navigateByUrl('/home');
                 }
                ));
    
  }
  
  getUserData(){
    return this.userData;
    
  }

  _nextWorkoutName(userProg){
    let lastWorkout = this.userData['lastWorkout'];
    let workouts = Object.keys(userProg);
    if(this.userData['lastWorkout'] == ""){
      this.userData['nextWorkout'] = workouts[0];
      this.updateUserData(this.userData);
      return workouts[0];
    }
    
    for(let i = 0; i < workouts.length-3; i++){
      if (workouts[i] == lastWorkout){
          this.nextWorkout = workouts[i+1];
          return this.nextWorkout;
        }
    }
    this.nextWorkout = workouts[0];
    return this.nextWorkout;
    
  }


/* Getters */

  getBmi(){
    return this.bmi;

  }

  getNextWorkoutName(){
    return this.nextWorkoutName;
  }

  getMenu(){
    return this.menu;
  }

  getNextWorkout(){
    return this.nextWorkout;
  }

  getProgram(){
    return this.userProg;
  }

  getDataByKey(key: string){
    return this.userData[key];
  }

  getUserProgress(){
    return this.userData['progress'];
  }

  /* Computations */

  checkDates(){
    let date2 = new Date().toDateString();
    let lastWorkout = new Date(this.userData.lastWorkoutDate);
    let today = new Date(date2);

    if((today.getDate() - lastWorkout.getDate()) > 30){
      console.log('new program');
      this.createProgramOrMenu('tProg')
    }
    else if((today.getDate() - lastWorkout.getDate()) > 21){
      console.log('go back two weeks');
      if(this.userData.progress.current_progress > 8){
        this.userData.progress.current_progress -= 8;
      }
      else{
        this.userData.progress.current_progress = 0;
      }
      this.updateUserData(this.userData).subscribe();   
    }
    else if((today.getDate() - lastWorkout.getDate()) > 14){
      console.log('go back one week');
      if(this.userData.progress.current_progress > 4){
        this.userData.progress.current_progress -= 4;
      }
      else{
        this.userData.progress.current_progress = 0;
      }
      this.updateUserData(this.userData).subscribe();   
    }
  }

  calculate_bmi(height, weight){
    this.bmi = Math.floor(weight/((height/100)*(height/100)));
    return Math.floor(weight/((height/100)*(height/100)));
  }

  getNumericLeve(level){
    let _numericLevel = 100;
    if (level == 'Intermediate') {_numericLevel = 200}
    else if (level == 'Profesional') {_numericLevel = 300}
    return _numericLevel;
  }

  fixTprog(str){
    str = str.replace(/-EX|-LS|-L|-H/gi,"") ;
    return str;
  }

  fixMenu(str){
    str = str.replace(/F-|-EX|-LS|-L|-H/gi,"") ;
    return str;
  }

}
