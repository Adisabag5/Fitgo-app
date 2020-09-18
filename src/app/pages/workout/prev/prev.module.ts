import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrevPageRoutingModule } from './prev-routing.module';

import { PrevPage } from './prev.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrevPageRoutingModule
  ],
  declarations: [PrevPage]
})
export class PrevPageModule {}
