import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { AngularFireModule} from '@angular/fire';

import { Workout } from '../workout/workout.model';




@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private workout: Observable<Workout>;
  private workoutCollection: AngularFirestoreCollection<Workout>;

  constructor(
    private firestore: AngularFirestore) { 
    
  }

  

  createDatabse(items: Object, dbSet: String){
    return this.firestore.collection(`${dbSet}/`).add(items);
    }

  readDatabse(dbSet: String) {
    return this.firestore.collection(`${dbSet}`).snapshotChanges();
  }

  updateDatabse(workout: Workout){
    delete workout.id;
    this.firestore.doc('workouts/' + workout.id).update(workout);
    }

    deleteItem(itemId: string){
      this.firestore.doc('itemsList/' + itemId).delete();
      }

 
}
