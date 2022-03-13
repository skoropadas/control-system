import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Optional, Self} from '@angular/core';
import {FlControlHost} from '../../control-system/control-host';
import {NgControl} from '@angular/forms';
import {FL_CONTROL_HOST} from '../../tokens/control-host';

@Component({
  selector: 'fl-combobox-host',
  template: `
    <ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: FL_CONTROL_HOST,
    useExisting: ComboboxHostComponent
  }]
})
export class ComboboxHostComponent<T> extends FlControlHost<T> {
  constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    @Inject(NgControl)
    @Self()
    @Optional()
    protected override ngControl?: NgControl
  ) {
    super(changeDetectorRef, undefined, ngControl);
  }
}
