import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutPage } from './workout.page';


const routes: Routes = [
  {
    
      path: '',
      component: WorkoutPage
  },
  {
    path: 'exercise',
    loadChildren: () => import('./exercise/exercise.module').then( m => m.ExercisePageModule)
  },
  {
    path: 'exercise1',
    loadChildren: () => import('./exercise1/exercise1.module').then( m => m.Exercise1PageModule)
  }
];   

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutPageRoutingModule {}
