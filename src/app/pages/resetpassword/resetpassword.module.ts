import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RouterModule } from '@angular/router';

import { ResetpasswordPageRoutingModule } from './resetpassword-routing.module';

import { ResetpasswordPage } from './resetpassword.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    ResetpasswordPageRoutingModule,
  ],
  declarations: [ResetpasswordPage],
})
export class ResetpasswordPageModule {}
