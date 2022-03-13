import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComboboxHostComponent} from './combobox-host.component';


@NgModule({
  declarations: [
    ComboboxHostComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ComboboxHostComponent]
})
export class ComboboxHostModule {
}
