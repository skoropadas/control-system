import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {CheckboxModule} from './components/checkbox/checkbox.module';
import {CheckboxGroupModule} from './components/checkbox-group/checkbox-group.module';
import {RadioButtonModule} from './components/radio-button/radio-button.module';
import {RadioGroupModule} from './components/radio-group/radio-group.module';
import {ChipModule} from './components/chip/chip.module';
import {ComboboxHostModule} from './components/combobox-host/combobox-host.module';
import {InputModule} from './directives/input/input.module';
import {OptionModule} from './components/option/option.module';
import {ComboboxInputModule} from './directives/combobox-input/combobox-input.module';

@NgModule({
  imports: [BrowserModule, FormsModule, CheckboxGroupModule, CheckboxModule, RadioGroupModule, RadioButtonModule, ChipModule, ComboboxHostModule, InputModule, OptionModule, ComboboxInputModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}
