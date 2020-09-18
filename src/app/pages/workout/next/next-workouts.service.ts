import { Injectable } from '@angular/core';
import { Workout } from '../workout.model';

@Injectable({
  providedIn: 'root'
})
export class NextWorkoutsService {
  private _workouts: Workout[] = [
    
  ];

  get workout(){
    return [...this._workouts];
  }

  constructor() { }
}
