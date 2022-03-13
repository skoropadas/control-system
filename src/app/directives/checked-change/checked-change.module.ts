import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CheckedChangeDirective} from './checked-change.directive';


@NgModule({
  declarations: [CheckedChangeDirective],
  imports: [
    CommonModule
  ],
  exports: [CheckedChangeDirective]
})
export class CheckedChangeModule {
}
