import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { CheckboxModule } from './components/checkbox/checkbox.module';
import { CheckboxGroupModule } from './components/checkbox-group/checkbox-group.module';

@NgModule({
  imports: [BrowserModule, FormsModule, CheckboxGroupModule, CheckboxModule],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
