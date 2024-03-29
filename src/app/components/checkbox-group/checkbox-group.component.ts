import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Inject,
  Input,
  Optional,
  Self,
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {FlCompareHost} from '../../classes/compare-host';
import {FlControlArrayHost} from '../../control-system/control-array-host';
import {FL_CONTROL_HOST} from '../../tokens/control-host';
import {FL_SELECTOR_BEHAVIOUR} from '../../tokens/selector-behavour';
import {FlSelectorBehaviour} from '../../enums/selector-behaviour';
import {FlOrientation} from '../../types/orientation';

@Component({
  selector: 'fl-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
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
    {
      provide: FL_SELECTOR_BEHAVIOUR,
      useValue: FlSelectorBehaviour.Checkbox
    }
  ],
})
export class CheckboxGroupComponent<T> extends FlControlArrayHost<T> {
  @Input()
  @HostBinding('attr.data-fl-orientation')
  public orientation: FlOrientation = 'vertical';

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
