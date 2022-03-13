import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CheckboxComponent} from './checkbox.component';
import {CheckedChangeModule} from '../../directives/checked-change/checked-change.module';

@NgModule({
  imports: [CommonModule, CheckedChangeModule],
  declarations: [CheckboxComponent],
  exports: [CheckboxComponent],
})
export class CheckboxModule {
}
