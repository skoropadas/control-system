import {ChangeDetectorRef, Directive, Inject, Optional, SkipSelf} from '@angular/core';
import {FL_CONTROL_HOST} from '../../tokens/control-host';
import {FlControlObjectHost} from '../../control-system/control-object-host';
import {FlBaseControlHost} from '../../interfaces/base-control-host';

/** We use this directive to skip update model process from native input, because the text that the user enters
 * should not be in the model, it is usually used for search. We also clear the model if the user has adjusted the input field  */
@Directive({
  selector: '[flComboboxInput]',
  providers: [{
    provide: FL_CONTROL_HOST,
    useExisting: ComboboxInputDirective
  }]
})
export class ComboboxInputDirective<T> extends FlControlObjectHost<T, string> {
  constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    @Inject(FL_CONTROL_HOST)
    @Optional()
    @SkipSelf()
    protected override host?: FlBaseControlHost<T>,
  ) {
    super(
      changeDetectorRef,
      (hostValue: T | null) => String(hostValue ?? ''), () => null,
      host,
    );
  }
}

