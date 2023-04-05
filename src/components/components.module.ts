import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { InputComponent } from './input/input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [
    ImagePickerComponent,
    InputComponent,
  ],
  exports: [
    ImagePickerComponent,
    InputComponent,
  ]
})
export class ComponentsModule { }