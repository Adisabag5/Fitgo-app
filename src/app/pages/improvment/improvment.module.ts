import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImprovmentPageRoutingModule } from './improvment-routing.module';

import { ImprovmentPage } from './improvment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImprovmentPageRoutingModule
  ],
  declarations: [ImprovmentPage]
})
export class ImprovmentPageModule {}
