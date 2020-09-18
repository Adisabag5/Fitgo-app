import { Component, OnInit } from '@angular/core';
import { WorkoutService } from './workout.service';
import { Workout } from './workout.model';
import { CrudService } from '../crud/crud.service';
import { ToastController , LoadingController, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { CurrUserService } from '../../services/curr-user.service';



import { VideoPlayer } from '@ionic-native/video-player';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-workout',
  templateUrl: './workout.page.html',
  styleUrls: ['./workout.page.scss'],
})
export class WorkoutPage implements OnInit {
  loadedWorkouts: Workout;

  public workout: any;
  public workoutKeys;
  public workoutVals=[];
  public isFinished = false;
  public workoutsDone = []
  public workoutCount = 0;
  public workoutLevel = 1;
  public tProg;
  

  constructor(
    private workoutService: WorkoutService, 
    public currUserService: CurrUserService,
    private crudService: CrudService,
    private loadingCtrl:LoadingController,
    
    ) { }

  ngOnInit() {
      this.getWorkout();
    
  }

  workoutProgress(key, i){
    this.workoutsDone[i] = true;
    this.workoutCount ++;
    if (this.workoutCount == this.workoutKeys.length){
      this.finishedWorkout();
    }
  }

  adjustLevel(){
    this.tProg = this.currUserService.getProgram();
    let totalWorkouts = Number(this.tProg['num of weeks']) * Number(this.tProg['workouts per week']);
    let currProgress = this.currUserService.getUserProgress();

    if(currProgress.current_progress >= Math.floor(totalWorkouts * 0.25)){
      this.workoutLevel *= 1.25;
    }
    else if(currProgress.current_progress >= Math.floor(totalWorkouts * 0.5)){
      this.workoutLevel *= 1.5;
    }
    else if(currProgress.current_progress >= Math.floor(totalWorkouts * 0.75)){
      this.workoutLevel *= 1.75;
    }

    let bmi = this.currUserService.getBmi();
    if (bmi > 30){
      this.workoutLevel *= 0.66;
    }else if (bmi < 21){
      this.workoutLevel *= 1.33;
    }
    let gender = this.currUserService.getDataByKey('gender');
    if (gender == 'Female'){
      this.workoutLevel *= 0.75;
    }

    for(let i = 0; i < this.workoutVals.length; i++){
      for(let j = 0; j < this.workoutVals[i].length; j++){
        if(this.workoutVals[i][j][1] == '1'){
          this.workoutVals[i][j][1] = 60;
       }
        this.workoutVals[i][j][1] = Math.floor(Number(this.workoutVals[i][j][1]) * this.workoutLevel);
        if(this.workoutVals[i][j][1] > 20){
          this.workoutVals[i][j][1] = String(this.workoutVals[i][j][1]) + ' Seconds'
        }else{
          this.workoutVals[i][j][1] = String(this.workoutVals[i][j][1]) + ' Reps'
        }
      }
    }
    console.log(this.workoutVals)
  }

  getWorkout(){
    this.workout = this.currUserService.getNextWorkout();
    this.workoutKeys = Object.keys(this.workout);
    let vals = Object.values(this.workout);
    
    for(let i = 0; i < this.workoutKeys.length; i++){
      let vals2 = Object.entries(vals[i]);
      this.workoutVals.push(vals2);
      this.workoutsDone.push(false);
    }
    this.adjustLevel();
    
    console.log(this.workout,this.workoutVals[0].length)
  }

  finishedWorkout(){
    console.log('finished');
    this.currUserService.afterWorkoutUpdate();
  }
  
}
/*
<ion-slide >
      <div class="slide">
        <img src="assets/images/Sunday - WorkoutA Chest & Biceps.jpg"/>
        <h2>Chest session</h2>
        <p>Hit START when you are ready...</p>
        <ion-button fill="clear" routerLink = "/exercise">START <ion-icon slot="end" name="arrow-forward" ></ion-icon></ion-button>
       </div>
    </ion-slide>

    <ion-slide >
      <div class="slide">
        <img src="assets/images/biceps-wo.jpg"/>
        <h2>Biceps session</h2>
        <p>Hit START when you are ready...</p>
        <ion-button fill="clear" routerLink = "/prev">START <ion-icon slot="end" name="arrow-forward" ></ion-icon></ion-button>
       </div>
    </ion-slide>

    <ion-slide >
      <div class="slide">
        <img src="assets/images/Abs.jpg"/>
        <h2>Abs session</h2>
        <p>Hit START when you are ready...</p>
        <ion-button fill="clear" routerLink = "/next">START <ion-icon slot="end" name="arrow-forward" ></ion-icon></ion-button>
       </div>
    </ion-slide>
*/