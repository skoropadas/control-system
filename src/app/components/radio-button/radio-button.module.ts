import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RadioButtonComponent} from './radio-button.component';
import {CheckedChangeModule} from '../../directives/checked-change/checked-change.module';


@NgModule({
  declarations: [
    RadioButtonComponent
  ],
  imports: [
    CommonModule,
    CheckedChangeModule
  ],
  exports: [RadioButtonComponent]
})
export class RadioButtonModule {
}
