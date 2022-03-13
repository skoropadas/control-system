import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComboboxInputDirective} from './combobox-input.directive';


@NgModule({
  declarations: [
    ComboboxInputDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [ComboboxInputDirective]
})
export class ComboboxInputModule {
}
