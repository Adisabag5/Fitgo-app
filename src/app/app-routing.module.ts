import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './pages/auth/auth.guard';
import { HomePage } from './pages/home/home.page';

const routes: Routes = [
  
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
  //,canLoad: [AuthGuard]
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'crud',
    loadChildren: () => import('./pages/crud/crud.module').then(m => m.CrudPageModule)
  },
  {
    path: 'workout',
    loadChildren: () => import('./pages/workout/workout.module').then( m => m.WorkoutPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 't-prog',
    loadChildren: () => import('./pages/t-prog/t-prog.module').then( m => m.TProgPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'league',
    loadChildren: () => import('./pages/league/league.module').then( m => m.LeaguePageModule)
  },
  {
    path: 'improvment',
    loadChildren: () => import('./pages/improvment/improvment.module').then( m => m.ImprovmentPageModule)
  },
  {
    path: 'prev',
    loadChildren: () => import('./pages/workout/prev/prev.module').then( m => m.PrevPageModule)
  },
  {
    path: 'next',
    loadChildren: () => import('./pages/workout/next/next.module').then( m => m.NextPageModule)
  },
  {
    path: 'exercise',
    loadChildren: () => import('./pages/workout/exercise/exercise.module').then( m => m.ExercisePageModule)
  }
 
  
]



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
