import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImprovmentPage } from './improvment.page';

const routes: Routes = [
  {
    path: '',
    component: ImprovmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImprovmentPageRoutingModule {}
