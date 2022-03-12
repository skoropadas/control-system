import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { FlCompareHost } from '../../classes/compare-host';
import { FlControlArrayHost } from '../../control-system/control-array-host';
import { FL_CONTROL_HOST } from '../../tokens/control-host';

@Component({
  selector: 'fl-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: FL_CONTROL_HOST,
      useExisting: CheckboxGroupComponent,
    },
    {
      provide: FlCompareHost,
      useExisting: CheckboxGroupComponent,
    },
  ],
})
export class CheckboxGroupComponent<T> extends FlControlArrayHost<T> {
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
