import { Injectable } from '@angular/core';
import { Workout } from './workout.model';
import { CurrUserService } from '../../services/curr-user.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  
  public nextWorkout: any;

  constructor(
    private http: HttpClient,
    public currUserService: CurrUserService

  ) { }

 


  fetchWorkout(){
    let nextWorkout = this.currUserService.getNextWorkout();
    return this.http.get(`https://fitgodb.firebaseio.com/Workouts/${nextWorkout}.json`)
    .pipe(map(res => {
      console.log((res));
      this.nextWorkout = res;     
    }));
  }

  getWorkout(){
    this.fetchWorkout().subscribe();
    return this.nextWorkout
  }

}
