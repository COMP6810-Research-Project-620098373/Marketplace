import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyItemsPageRoutingModule } from './my-items-routing.module';

import { MyItemsPage } from './my-items.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyItemsPageRoutingModule
  ],
  declarations: [MyItemsPage]
})
export class MyItemsPageModule {}
